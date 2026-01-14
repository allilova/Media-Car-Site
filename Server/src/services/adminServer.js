import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js'; 
import User from "../models/User.js";
import { JWT_SECRET } from '../config/constants.js';

const register = async (email, password) => {
    const userCount = await User.countDocuments({ email });

    if (userCount > 0) {
        throw new Error('Този имейл вече е регистриран!');
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return User.create({ email, password: hashedPassword, isAdmin: true }); // Правим ги админи за теста
};

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Грешен имейл или парола!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Грешен имейл или парола!');
    }

    const payload = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };


    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    return { token, user };
}

export default {
    register,
    login,
}