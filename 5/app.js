import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import indexRouter from "./src/routes/index.router.js";

dotenv.config();

const app = express();
const port = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl: 15
        }),
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false
    }));

app.use('/', indexRouter);

app.get('/', (req, res) => {
    res.render('index.hbs')
})

const mongoEnviroment = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongo server connected')
}

mongoEnviroment();

app.listen(port, () => {
    console.log('server started in port ' + port)
})
