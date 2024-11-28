import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}))          // express.json() allows json request and limit it to 16kb size
app.use(express.urlencoded({extended: true, limit: "16kb"}))    // allows reading data from url's -- encoded data
app.use(express.static("public"))               // allows to store and read public data in public folder

app.use(cookieParser())     // allows to set and manage cookie in client browser