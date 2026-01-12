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
router.get('/products', async (req, res) => {
    try {
        const category = req.query.category;
        
        let filter = {};
        if (category) {
            filter = { category: category };
        }


        const products = await Product.find(filter);
        
        res.json(products);
    } catch (err) {
        console.error('Грешка при зареждане:', err);
        res.status(500).json({ error: 'Грешка при зареждане на продуктите' });
    }
});
router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ error: 'Продуктът не е намерен' });
        }

        res.json(product);
    } catch (err) {
        console.error('Грешка при търсене на продукт:', err);
        res.status(500).json({ error: 'Грешка при зареждане на продукта' });
    }
});
router.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

export default router;