import { connect } from "mongoose";
import { DB_URL } from './constants.js';

export default async function mongooseInit() {
    try {
        await connect(DB_URL, { dbName: 'madiaCar' });
        console.log('Successfully connected to DB!');
    } catch (err) {
        console.log('Cannot connect to DB! ' + err.message);
    }
}
