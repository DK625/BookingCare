import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/conectDB';
import cors from 'cors';
import cookieParser from "cookie-parser"
require('dotenv').config();   // giup chayj dc dong process.env

// taskkill /F /IM node.exe

let app = express();
// const app = express();
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
// app.use(cors({ origin: true }));
app.use(cookieParser())
// app.use(cors({ credentials: true }));

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;  //Port === undefined => Port = 6060

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port);
})
