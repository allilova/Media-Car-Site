import { Router } from 'express';
import Product from '../models/Product.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = Router();

router.post('/', isAdmin, async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.delete('/:id', isAdmin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

router.put('/:id',isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!product) {
            return res.status(404).json({ error: 'Продуктът не е намерен' });
        }

        console.log('Продуктът е обновен:', product.title);
        res.json(product);
    } catch (err) {
        console.error('Грешка при редакция:', err);
        res.status(500).json({ error: 'Грешка при обновяване на продукта' });
    }
});

export default router;