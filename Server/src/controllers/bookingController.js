import { Router } from 'express';
import Booking from '../models/Booking.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { sendMail, esc } from '../lib/mailer.js';
import { MAIL_TO } from '../config/constants.js';

const router = Router();

const todayIso = () => new Date().toISOString().slice(0, 10);

// Публично: кои часове са заети за дадена дата (без лични данни)
router.get('/taken', async (req, res) => {
    const { date } = req.query;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return res.json([]);
    const bookings = await Booking.find({ date }, { time: 1, _id: 0 });
    res.json(bookings.map(b => b.time));
});

router.post('/', async (req, res) => {
    try {
        const { date, time, user, car, package: pkg, note } = req.body;

        if (!date || date < todayIso()) {
            return res.status(400).json({ error: 'Изберете дата от днес нататък.' });
        }
        if (!user?.name || !user?.phone || !user?.address) {
            return res.status(400).json({ error: 'Попълнете име, телефон и адрес за монтажа.' });
        }
        if (await Booking.exists({ date, time })) {
            return res.status(409).json({ error: 'Този час току-що беше зает. Изберете друг.' });
        }

        const newBooking = await Booking.create({ date, time, user, car, package: pkg, note });

        const carText = [car?.brand, car?.model, car?.year].filter(Boolean).join(' ');
        sendMail({
            to: MAIL_TO,
            subject: `Нов час за монтаж: ${date} ${time}`,
            html: `<p><strong>${esc(user.name)}</strong>, ${esc(user.phone)}</p>
                <p>Кола: ${esc(carText || '—')}<br>Пакет: ${esc(pkg || '—')}<br>Адрес: ${esc(user.address)}</p>
                <p>${esc(note || '')}</p>`
        }).catch(err => console.error('Грешка при мейл:', err));

        res.status(201).json(newBooking);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Този час току-що беше зает. Изберете друг.' });
        }
        console.error(err);
        res.status(500).json({ error: 'Часът не беше запазен. Обадете ни се на телефона.' });
    }
});

router.get('/', isAdmin, async (req, res) => {
    try {
        res.json(await Booking.find().sort({ date: 1, time: 1 }));
    } catch (err) {
        res.status(500).json({ error: 'Грешка при зареждане на резервациите' });
    }
});

router.put('/:id', isAdmin, async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, { status: req.body.status }, { new: true, runValidators: true }
        );
        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ error: 'Грешка при обновяване на статуса' });
    }
});

router.delete('/:id', isAdmin, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Резервацията е изтрита' });
    } catch (err) {
        res.status(500).json({ error: 'Грешка при изтриване' });
    }
});

export default router;
