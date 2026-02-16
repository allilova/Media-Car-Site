import { Router } from 'express';
import Booking from '../models/Booking.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

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

router.get('/', isAdmin, async (req, res) => {
    try {
        
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Грешка при зареждане на резервациите' });
    }
});

router.put('/:id', isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        
       
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { new: true } 
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