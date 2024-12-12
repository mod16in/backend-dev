import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';
import stringify from "json-stringify-safe";     // like JSON.stringify this is used to stringify the circular objects (object referring itself)
//circular object was returned by mongoose.connect

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        console.log(`${process.env.MONGODB_URI}${DB_NAME}`);
    } catch(error) {
        console.error(`ERROR: connection to DB failed - Mohit`, error)
        process.exit(1);
    }
}

export default connectDB;