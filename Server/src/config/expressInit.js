import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { CLIENT_ORIGIN, SESSION_SECRET } from './constants.js';

export default function expressInit(app) {
    app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

    // Снимките се качват като base64 от админ панела, затова лимитът е по-голям
    app.use(express.json({ limit: '15mb' }));
    app.use(express.urlencoded({ extended: false, limit: '15mb' }));
    app.use(express.static('static'));
    app.use(cookieParser());
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
    }));
}
