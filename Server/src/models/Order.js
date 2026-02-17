import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String }
    },
    items: [
        {
            title: String,
            quantity: Number,
            price: Number,
            variant: String // напр. "4GB RAM / 64GB ROM"
        }
    ],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;