import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { path, __dirname } from './utils/index.utils.js';
import router from './routes/index.routes.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import initializePassport from './config/passport.config.js'
import MongoStore from 'connect-mongo';

const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 15
    }),
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('index.handlebars');
})

const mongoEnviroment = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongo server started');
}

mongoEnviroment();

app.use('/', router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})