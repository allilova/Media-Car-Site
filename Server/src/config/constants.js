// Всички тайни идват от файла .env (НЕ се качва в git).
// Четем го сами, за да работи с всякаква кодировка (UTF-8, UTF-8 с BOM, UTF-16) и всяка версия на Node.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const envPath = fileURLToPath(new URL('../.env.example', import.meta.url));

function loadEnv(file) {
    if (!fs.existsSync(file)) {
        console.warn(`[env] Не намирам .env файл тук: ${file}`);
        return;
    }
    const buf = fs.readFileSync(file);
    let text = (buf[0] === 0xFF && buf[1] === 0xFE) ? buf.toString('utf16le') : buf.toString('utf8');
    text = text.replace(/^\uFEFF/, '');

    const found = [];
    for (const raw of text.split(/\r?\n/)) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        const eq = line.indexOf('=');
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let value = line.slice(eq + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
        if (!(key in process.env)) process.env[key] = value;
        found.push(key);
    }
    console.log(`[env] Заредени от ${file}: ${found.join(', ') || 'нищо'}`);
}

loadEnv(envPath);

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