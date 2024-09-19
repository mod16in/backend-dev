// require('dotenv').config({path: './env'})        // this method is not working because of type: module .. this is used in common js

/* import dotenv from "dotenv"
dotenv.config({
    path: './env'
})
    since you have defined to include env variables in package.json only, so you do not have to explicitly call config file of dotenv 
*/ 

import connectDB from "./DB/connectDB.js";
import express from "express"
    
const app = express();

connectDB();

app.get('/', (request, response) => {
    response.send("<h1> Heading 1: This is base route </h1>");
})

app.get('/new', (request, response) => {
    response.send("<h3> Heading 3: This is a new route </h3>");
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
})()            // this is IIFE (immediately invoked function expression)
*/