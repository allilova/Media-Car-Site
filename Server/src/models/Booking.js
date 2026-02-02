import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    date: {
        type: String, 
        required: true
    },
    time: {
        type: String, 
        required: true
    },
    user: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String }
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;