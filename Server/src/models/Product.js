import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    description: { type: String },
    images: [{ type: String }],
    specs: {
        os: { type: String, default: 'Android 13' },      
        screen: { type: String, default: 'QLED' },        
        resolution: { type: String, default: '1280x720' },
        power: { type: String, default: '4 x 45W' }       
    },
    variants: [{
        ram: Number,
        rom: Number,
        price: Number,
        cpu: { type: String, default: '4-core' } 
    }],
    
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
export default Product;