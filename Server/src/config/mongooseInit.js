import { connect } from "mongoose";

export default async function mongooseInit() {
    try{
        const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
        await connect(url, {dbName: 'madiaCar'});

        console.log('Successfully connected to DB!');
    }catch(err){
        console.log('Cannot connesct to DB!' + err.message);
    }
}