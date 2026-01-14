import jwt from '../lib/jwt.js';
import { JWT_SECRET } from '../config/constants.js';

export const adminMiddleware = async (req, res, next) => {
 
    const adminHeader = req.headers['authorization'];

    if (!adminHeader) {
        return next();
    }

    const token = adminHeader.split(' ')[1]; 

    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        req.isAuthenticated = true;

        next();
    } catch (err) {
        res.status(401).json({ error: 'Невалидна сесия' });
    }
};


export const isAuth = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({ error: 'Не сте влезли в системата!' });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated || !req.user.isAdmin) {
        return res.status(403).json({ error: 'Нямате администраторски права!' });
    }
    next();
};