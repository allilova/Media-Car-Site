// Всички тайни идват от променливи на средата (файл .env, който НЕ се качва в git).
try { process.loadEnvFile(new URL('../.env', import.meta.url)); } catch { /* няма .env – ползваме реалните env променливи */ }

const required = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Липсва променлива на средата ${name}. Виж Server/src/.env.example`);
    }
    return value;
};

export const BRAND_NAME = 'Retrofy';
export const JWT_SECRET = required('JWT_SECRET');
export const SESSION_SECRET = required('SESSION_SECRET');
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:4200';
export const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
export const PORT = Number(process.env.PORT) || 3000;

export const MAIL_USER = process.env.MAIL_USER || '';
export const MAIL_PASS = process.env.MAIL_PASS || '';
export const MAIL_TO = process.env.MAIL_TO || MAIL_USER;

// Регистрация на нов админ е позволена само ако в базата няма потребители
// (първоначална настройка) или ако изрично е разрешено.
export const ALLOW_ADMIN_REGISTER = process.env.ALLOW_ADMIN_REGISTER === 'true';
