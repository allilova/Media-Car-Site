import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ['multimedia', 'accessories', 'services'] },
    price: { type: Number, required: true },
    oldPrice: { type: Number }, // Опционално
    description: { type: String },
    images: [{ type: String }], // Масив от стрингове (URL-и на снимки)
    variants: [{
        ram: Number,
        rom: Number,
        price: Number
    }]
});

const Product = mongoose.model('Product', productSchema);

export default Product;