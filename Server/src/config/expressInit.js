import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors'; 

export default function expressInit(app) {
    app.use(cors({
        origin: 'http://localhost:4200', 
        credentials: true 
    }));

    app.use(express.json({ limit: '50mb' })); 

    app.use(express.urlencoded({ extended: false, limit: '50mb'}));
    app.use(express.static('static'));
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
};