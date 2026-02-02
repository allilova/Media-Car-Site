import { Router } from 'express';
import Booking from '../models/Booking.js';

const router = Router();


router.post('/', async (req, res) => {
    try {
        const { date, time, user } = req.body;

        
        const existingBooking = await Booking.findOne({ date, time });
        if (existingBooking) {
            return res.status(400).json({ error: 'Този час вече е резервиран!' });
        }

        const newBooking = await Booking.create({ date, time, user });
        
        console.log('Нова резервация:', newBooking._id);
        res.status(201).json(newBooking);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Грешка при запазване на часа.' });
    }
});

// 2. ВЗИМАНЕ НА ВСИЧКИ РЕЗЕРВАЦИИ (GET) - Само за Админ (по-късно)
// router.get('/', isAdmin, async (req, res) => { ... })

export default router;