import mongoose from "mongoose";
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB connected: ${connectionInstance}`);    //check what does connection to mongodb returns
    } catch(error) {
        console.error(`ERROR: connection to DB failed - Mohit`, error)
        process.exit(1);
    }
}

export default connectDB;