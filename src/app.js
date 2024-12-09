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

// import router 
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter);       // /api/v1 is industry standard 
// http://localhost:9000/api/v1/users/register
// here we have just router the incoming request containing /users to the userRouter(where we defined all routes for /users)

export { app }
// export like these cannot be imported with other name but those with default export can be named differently while importing
