import nodemailer from 'nodemailer';
import { MAIL_USER, MAIL_PASS, BRAND_NAME } from '../config/constants.js';

const transporter = MAIL_USER && MAIL_PASS
    ? nodemailer.createTransport({ service: 'gmail', auth: { user: MAIL_USER, pass: MAIL_PASS } })
    : null;

export const FROM = `"${BRAND_NAME}" <${MAIL_USER}>`;

export async function sendMail(options) {
    if (!transporter) {
        console.warn('Имейлът не е изпратен: липсват MAIL_USER / MAIL_PASS в .env');
        return;
    }
    return transporter.sendMail({ from: FROM, ...options });
}

// Escape на потребителски текст, преди да влезе в HTML на имейл
export const esc = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const eur = (n) => `€${Number(n || 0).toFixed(2)}`;
