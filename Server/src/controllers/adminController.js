import { Router } from 'express';
import adminServer from '../services/adminServer.js'; 
import { getErrorMessage } from '../utils/errorUtils.js'; 

const router = Router();

// --- РЕГИСТРАЦИЯ ---
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        await adminServer.register(email, password);
        res.status(201).json({ message: 'Успешна регистрация' });
    } catch (err) {
        const msg = getErrorMessage(err);
        res.status(400).json({ error: msg });
    }
});

// --- ЛОГИН ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await adminServer.login(email, password);
        
        // Връщаме токена на Angular
        res.json({
            token: result.token,
            email: result.user.email,
            isAdmin: result.user.isAdmin
        });

    } catch (err) {
        const msg = getErrorMessage(err);
        res.status(401).json({ error: msg });
    }
});

export default router;