import { Router } from 'express';
import Order from '../models/Order.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import nodemailer from 'nodemailer'; // <--- 1. Импортираме Nodemailer

const router = Router();

// --- КОНФИГУРАЦИЯ НА ПОЩАТА ---
// (Същата като в contactController)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'borislav.borisov2003b@gmail.com', 
        pass: 'jmku lvdu tsaf erjy'      
    }
});


router.post('/', async (req, res) => {
    try {
        const { customer, items, totalPrice } = req.body;

        
        const newOrder = await Order.create({
            customer,
            items,
            totalPrice,
            status: 'pending'
        });

       
        const itemsListHtml = items.map(item => 
            `<li>${item.title} (x${item.quantity}) - ${item.price} лв.</li>`
        ).join('');

      
        if (customer.email) {
            const mailOptions = {
                from: '"Media Car Garage" <borislav.borisov2003b@gmail.com>',
                to: customer.email,
                subject: `Потвърждение за поръчка #${newOrder._id.toString().slice(-6)}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                        <h2 style="color: #333;">Благодарим Ви за поръчката, ${customer.name}!</h2>
                        <p>Вашата поръчка е приета успешно и се обработва.</p>
                        
                        <h3>Детайли за поръчката:</h3>
                        <ul>${itemsListHtml}</ul>
                        
                        <p><strong>Обща сума: ${totalPrice} лв.</strong></p>
                        <p><strong>Адрес за доставка:</strong> ${customer.address}</p>
                        
                        <hr>
                        <p style="font-size: 12px; color: #777;">Ще получите нов имейл, когато пратката бъде изпратена.</p>
                    </div>
                `
            };

            
            transporter.sendMail(mailOptions).catch(err => console.error('Грешка при мейл:', err));
        }

        console.log('Нова поръчка:', newOrder._id);
        res.status(201).json(newOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Грешка при създаване на поръчката.' });
    }
});


router.get('/', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Грешка при зареждане на поръчките.' });
    }
});


router.put('/:id', isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

       
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { status: status }, 
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Поръчката не е намерена' });
        }

        
        if (status === 'shipped' && updatedOrder.customer.email) {
            
            const mailOptions = {
                from: '"Media Car Garage" <borislav.borisov2003b@gmail.com>',
                to: updatedOrder.customer.email,
                subject: `Поръчка #${updatedOrder._id.toString().slice(-6)} е ИЗПРАТЕНА!`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                        <h2 style="color: #007bff;">Пратката пътува към вас! 🚚</h2>
                        <p>Здравейте, ${updatedOrder.customer.name}</p>
                        <p>Статусът на вашата поръчка беше променен на <strong>ИЗПРАТЕНА</strong>.</p>
                        
                        <p>Очаквайте доставка до офис или адрес в рамките на 1-2 работни дни.</p>
                        
                        <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 20px;">
                            <strong>Адрес за доставка:</strong><br>
                            ${updatedOrder.customer.address}
                        </div>

                        <p>Благодарим Ви, че избрахте нас!</p>
                    </div>
                `
            };

            transporter.sendMail(mailOptions).catch(err => console.error('Грешка при мейл за изпращане:', err));
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




router.post('/', async (req, res) => {
    try {
        const { customer, items, totalPrice } = req.body;

        const newOrder = await Order.create({
            customer,
            items,
            totalPrice
        });

        console.log('Нова поръчка създадена:', newOrder._id);
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Грешка при създаване на поръчката.' });
    }
});


router.get('/', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Грешка при зареждане на поръчките.' });
    }
});

export default router;