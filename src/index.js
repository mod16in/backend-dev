// require('dotenv').config({path: './env'})        // this method is not working because of type: module .. this is used in common js
import dotenv from "dotenv"
import connectDB from "./DB/connectDB.js";
import express from "express"

const app = express();

dotenv.config({
    path: './env'
})

connectDB();

app.get('/', (request, response) => {
    response.send("chl to gya is port pr");
})

app.get('/new', () => {
    response.send("ye new route h");
})

app.listen(`${process.env.PORT}`, ()=>{
    console.log(`app listening on port ${process.env.PORT}`);
})













/*
import express from "express"
const app = express();
;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on('error', (error)=> {
            console.error("ERROR: ", error);
            throw error;
        });
        app.listen(process.env.PORT, ()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})()
*/