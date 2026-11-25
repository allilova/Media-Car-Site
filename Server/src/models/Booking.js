import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ }, // YYYY-MM-DD
    time: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
    package: { type: String },   // Базов / Стандартен / Премиум / Само труд
    car: {
        brand: { type: String },
        model: { type: String },
        year: { type: String }
    },
    user: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String, required: true }
    },
    note: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

bookingSchema.index({ date: 1, time: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
