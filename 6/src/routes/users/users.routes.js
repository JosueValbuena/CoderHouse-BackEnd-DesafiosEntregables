import { Router } from "express";

const userRouter = Router();

userRouter.get('/register', (req, res) => {
    res.render('register.handlebars');
});

userRouter.post('/register', (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    console.log(req.body)
    res.render('index.handlebars');
});

userRouter.get('/login', (req, res) => {
    res.render('login.handlebars')
});

userRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    res.render('index.handlebars');
});

export default userRouter;