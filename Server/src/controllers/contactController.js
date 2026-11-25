import { Router } from 'express';
import { sendMail, esc } from '../lib/mailer.js';
import { MAIL_TO } from '../config/constants.js';

const router = Router();

const TYPES = {
    general: 'Запитване от сайта',
    b2b: 'B2B запитване (автокъща / автопарк)',
};

router.post('/', async (req, res) => {
    const { name, email, phone, subject, message, type = 'general', company, fleetSize } = req.body;

    if (!name || !(email || phone) || !message) {
        return res.status(400).json({ error: 'Попълнете име, имейл или телефон и съобщение.' });
    }

    const title = TYPES[type] || TYPES.general;
    const rows = [
        ['Име', name], ['Имейл', email], ['Телефон', phone],
        ['Фирма', company], ['Брой автомобили', fleetSize], ['Тема', subject],
    ].filter(([, v]) => v);

    try {
        await sendMail({
            to: MAIL_TO,
            replyTo: email || undefined,
            subject: `${title}: ${String(subject || name).slice(0, 80)}`,
            text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${message}`,
            html: `<h3>${esc(title)}</h3>`
                + rows.map(([k, v]) => `<p><strong>${esc(k)}:</strong> ${esc(v)}</p>`).join('')
                + `<hr><p style="white-space:pre-line">${esc(message)}</p>`,
        });
        res.status(200).json({ message: 'Съобщението е изпратено.' });
    } catch (error) {
        console.error('Грешка при пращане:', error);
        res.status(500).json({ error: 'Съобщението не беше изпратено. Обадете ни се на телефона.' });
    }
});

export default router;
