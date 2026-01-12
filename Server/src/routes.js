import { Router } from "express";
import Product from "./models/Product.js"; 

const router = Router();


router.get('/', (req, res) => {
    res.send('Auto Media Garage API is working!');
});


router.post('/products', async (req, res) => {
    try {
        const productData = req.body; 
        
       
        const newProduct = await Product.create(productData);
        
        console.log('Създаден продукт:', newProduct.title);
        res.status(201).json(newProduct); 
        
    } catch (err) {
        console.error('Грешка при създаване:', err);
        res.status(400).json({ error: err.message });
    }
});

export default router;