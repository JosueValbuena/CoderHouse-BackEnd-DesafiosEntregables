import express from "express";
import userModel from "../models/users.models.js";
const sessionRouter = express.Router();

sessionRouter.get('/register', async (req, res) => {
    res.render('register.hbs')
});

sessionRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body;

    const verifyUser = await userModel.findOne({ email: email })

    console.log(req.body);
    if (verifyUser) {
        return res.send('Usuario ya registrado con este email')
    }

    if (!firstName || !lastName || !email || !age || !password) {
        return res.send({ status: 'error', message: 'Faltan datos' })
    }

    await userModel.create({ first_name: firstName, last_name: lastName, email, age, password });

    res.redirect('/api/sessions/profile');
})

sessionRouter.get('/login', async (req, res) => {
    if (!req.session.autorized) {
        res.render('login.hbs')
    } else {
        console.log(req.session.user)
        res.render('profile.hbs', {user})
    };
});

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const verifyUser = await userModel.findOne({ email: email });
    if (!verifyUser) {
        return res.send('Este usuario no existe')
    } else if (email === verifyUser.email && password === verifyUser.password) {
        console.log('Usuario logueado correctamente')
        req.session.user = { name: verifyUser.first_name, email: verifyUser.email };
        req.session.autorized = true;
        res.redirect('/api/sessions/profile')
    }
});

sessionRouter.get('/profile', async (req, res) => {
    res.render('index.hbs')
})

export default sessionRouter;