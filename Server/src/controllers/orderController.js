import { Router } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { sendMail, esc, eur } from '../lib/mailer.js';
import { MAIL_TO } from '../config/constants.js';

const router = Router();

// Артикули, които не са в базата, а са фиксирани услуги
const FIXED_ITEMS = {
    'service-installation': { title: 'Мобилен монтаж на адрес (София)', price: 70 },
};

// Цената се смята на сървъра – не вярваме на сумата, която идва от браузъра.
async function priceItems(items = []) {
    const priced = [];
    for (const item of items) {
        const quantity = Math.max(1, Math.min(10, parseInt(item.quantity, 10) || 1));
        const fixed = FIXED_ITEMS[item.productId];
        if (fixed) {
            priced.push({ ...fixed, productId: item.productId, quantity, variant: item.variant });
            continue;
        }
        if (!mongoose.isValidObjectId(item.productId)) throw new Error('Невалиден продукт в количката.');
        const product = await Product.findById(item.productId);
        if (!product) throw new Error('Продукт от количката вече не е наличен.');
        const variant = item.variantId ? product.variants.id(item.variantId) : null;
        priced.push({
            productId: product._id.toString(),
            variantId: variant?._id?.toString(),
            title: product.title,
            quantity,
            price: variant?.price ?? product.price,
            variant: variant ? `${variant.ram}GB RAM / ${variant.rom}GB ROM – ${variant.cpu}` : item.variant,
        });
    }
    return priced;
}

const itemsHtml = (items) => items.map(i =>
    `<li style="margin-bottom:8px">${esc(i.title)} ×${i.quantity} – ${eur(i.price * i.quantity)}`
    + (i.variant ? `<br><small style="color:#666">${esc(i.variant)}</small>` : '') + '</li>'
).join('');

router.post('/', async (req, res) => {
    try {
        const { customer, items, paymentMethod } = req.body;
        if (!customer?.name || !customer?.phone || !customer?.address) {
            return res.status(400).json({ error: 'Попълнете име, телефон и адрес.' });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Количката е празна.' });
        }

        const pricedItems = await priceItems(items);
        const totalPrice = pricedItems.reduce((s, i) => s + i.price * i.quantity, 0);

        const allowedPayments = ['Наложен платеж', 'Плащане при монтаж'];
        const newOrder = await Order.create({
            customer: { ...customer, city: customer.city || 'България' },
            items: pricedItems,
            totalPrice,
            paymentMethod: allowedPayments.includes(paymentMethod) ? paymentMethod : 'Наложен платеж',
            status: 'pending'
        });

        const shortId = newOrder._id.toString().slice(-6);
        const summary = `<ul>${itemsHtml(pricedItems)}</ul>
            <p><strong>Обща сума: ${eur(totalPrice)}</strong></p>
            <p><strong>Плащане:</strong> ${esc(newOrder.paymentMethod)}</p>
            <p><strong>Адрес:</strong> ${esc(customer.address)}</p>`;

        if (customer.email) {
            sendMail({
                to: customer.email,
                subject: `Потвърждение за поръчка #${shortId}`,
                html: `<div style="font-family:Arial,sans-serif;padding:20px">
                    <h2>Благодарим ви, ${esc(customer.name)}!</h2>
                    <p>Поръчката е приета. Ще ви се обадим за потвърждение.</p>${summary}</div>`
            }).catch(err => console.error('Грешка при мейл:', err));
        }
        sendMail({
            to: MAIL_TO,
            subject: `Нова поръчка #${shortId} – ${eur(totalPrice)}`,
            html: `<p>${esc(customer.name)}, ${esc(customer.phone)}</p>${summary}`
        }).catch(err => console.error('Грешка при мейл:', err));

        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Поръчката не беше създадена.' });
    }
});

router.get('/', isAdmin, async (req, res) => {
    try {
        res.json(await Order.find().sort({ createdAt: -1 }));
    } catch (err) {
        res.status(500).json({ error: 'Грешка при зареждане на поръчките.' });
    }
});

router.put('/:id', isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!updatedOrder) return res.status(404).json({ error: 'Поръчката не е намерена' });

        if (status === 'shipped' && updatedOrder.customer.email) {
            sendMail({
                to: updatedOrder.customer.email,
                subject: `Поръчка #${updatedOrder._id.toString().slice(-6)} е изпратена`,
                html: `<div style="font-family:Arial,sans-serif;padding:20px">
                    <h2>Пратката пътува към вас</h2>
                    <p>Здравейте, ${esc(updatedOrder.customer.name)}! Очаквайте доставка до 1–2 работни дни.</p>
                    <p><strong>Адрес:</strong> ${esc(updatedOrder.customer.address)}</p></div>`
            }).catch(err => console.error('Грешка при мейл:', err));
        }
        res.json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Грешка при обновяване на статуса' });
    }
});

router.delete('/:id', isAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Поръчката е изтрита' });
    } catch (err) {
        res.status(500).json({ error: 'Грешка при изтриване' });
    }
});

export default router;
