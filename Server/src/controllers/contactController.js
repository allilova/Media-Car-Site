import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'borislav.borisov2003b@gmail.com', 
        pass: 'jmku lvdu tsaf erjy'    
    }
});

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Съдържанието на имейла, който ТИ ще получиш
    const mailOptions = {
        from: `"${name}" <${email}>`, // От кого е (визуално)
        to: 'borislav.borisov2003b@gmail.com',   // <-- КЪДЕ ДА ПРИСТИГАТ ЗАПИТВАНИЯТА
        subject: `Запитване от сайта: ${subject}`,
        text: `
            Име: ${name}
            Имейл: ${email}
            Тема: ${subject}
            
            Съобщение:
            ${message}
        `,
        html: `
            <h3>Ново запитване от сайта</h3>
            <p><strong>Име:</strong> ${name}</p>
            <p><strong>Имейл:</strong> ${email}</p>
            <p><strong>Тема:</strong> ${subject}</p>
            <hr>
            <p><strong>Съобщение:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Имейлът е изпратен!');
        res.status(200).json({ message: 'Съобщението е изпратено успешно!' });
    } catch (error) {
        console.error('Грешка при пращане:', error);
        res.status(500).json({ error: 'Възникна грешка при изпращането.' });
    }
});

export default router;