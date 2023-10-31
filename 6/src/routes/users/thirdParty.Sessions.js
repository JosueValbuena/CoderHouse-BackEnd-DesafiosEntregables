import dotenv from 'dotenv';
import { Router } from 'express';
import passport from 'passport';

dotenv.config();

const thirdPartyRouter = Router();

thirdPartyRouter.get('/github',
    passport.authenticate('github', { scope: ['user: email'] }),
    async (req, res) => {

    })

thirdPartyRouter.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/' }),
    async (req, res) => {
        if (!req.user) {
            console.log('Fallo la autenticacion');
            res.redirect('/')
            return
        };

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            rol: 'user'
        };

        req.session.autorized = true;

        res.redirect('/');
    })

export default thirdPartyRouter;