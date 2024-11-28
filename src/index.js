import connectDB from "./DB/connectDB.js";
import express from "express"
    
const app = express();
const port = process.env.PORT || 9040;

connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`App is running on port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !! ", err);
})









// require('dotenv').config({path: './env'})        // this method is not working because of type: module .. this is used in common js

/* import dotenv from "dotenv"
dotenv.config({
    path: './env'
})
    since you have defined to include env variables in package.json only, so you do not have to explicitly call config file of dotenv 
*/ 





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
})()            // this is IIFE (immediately invoked function expression)
*/