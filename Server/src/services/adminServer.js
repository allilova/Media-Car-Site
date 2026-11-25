import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js';
import User from "../models/User.js";
import { JWT_SECRET, ALLOW_ADMIN_REGISTER } from '../config/constants.js';

const register = async (email, password) => {
    // Без това всеки посетител можеше да си направи админ акаунт.
    const usersCount = await User.countDocuments();
    if (usersCount > 0 && !ALLOW_ADMIN_REGISTER) {
        const err = new Error('Регистрацията е затворена.');
        err.status = 403;
        throw err;
    }

    if (!email || !password || password.length < 8) {
        throw new Error('Имейлът е задължителен, а паролата трябва да е поне 8 символа.');
    }

    if (await User.countDocuments({ email }) > 0) {
        throw new Error('Този имейл вече е регистриран!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ email, password: hashedPassword, isAdmin: true });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Грешен имейл или парола!');
    }

    const payload = { _id: user._id, email: user.email, isAdmin: user.isAdmin };
    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
    return { token, user };
};

export default { register, login };
