import { Router } from "express";
import passport from "passport";

const userRouter = Router();

userRouter.get('/register', (req, res) => {
    res.render('register.handlebars');
});

userRouter.post('/register',
    passport.authenticate('register', { failureRedirect: `/user/failregister` }),
    async (req, res) => {
        res.render('index.handlebars');
    });

userRouter.get('/failregister', async (req, res) => {
    console.log({ status: 'error', message: 'Fallo el registro de usuario' });
    res.render('register.handlebars');
})

userRouter.get('/login', (req, res) => {
    res.render('login.handlebars')
});

userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/user/faillogin' }),
    async (req, res) => {
        if (!req.user) return res.status(400).send({ status: 'error', message: 'Credenciales invalidas' });

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        };

        if (req.user.email === 'coderhouse@email.com') {
            req.session.user.rol = 'admin';
        } else {
            req.session.user.rol = 'user';
        };

        req.session.autorized = true;

        console.log({ status: 'success', payload: req.user });
        res.render('index.handlebars');
    });

userRouter.get('/faillogin', (req, res) => {
    console.log({ status: 'error', message: 'Usuario no autenticado' });
    res.render('login.handlebars');
})

userRouter.get('/profile', (req, res) => {
    if (!req.session.autorized) {
        console.log('no hay usuario autorizado')
        res.render('login.handlebars')
        return
    };

    let user = req.session.user;
    res.render('profile.handlebars', { user });
});

userRouter.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log('Error al cerrar sesion' + err)
        }
    })
    res.render('index.handlebars');
});

export default userRouter;