import passport from 'passport';
import local from 'passport-local';
import usersModel from '../models/users.models.js';
import { createHash, isValidPassword } from '../utils/index.utils.js';
import GitHubStrategy from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

const localStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
        async (req, username, password, done) => {
            const { first_name, last_name, age } = req.body;

            try {
                let user = await usersModel.findOne({ email: username });
                if (user) {
                    console.log('Ya existe un usuario con este email');
                    return done(null, false);
                };

                const newUser = {
                    first_name,
                    last_name,
                    email: username,
                    age,
                    password: createHash(password)
                };

                let result = await usersModel.create(newUser);

                return done(null, result);
            } catch (error) {
                return done({ message: 'Error al agregar usuario', error })
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await usersModel.findById(id);
        done(null, user);
    })

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await usersModel.findOne({ email: username });

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            };

            const isPasswordValid = isValidPassword(user, password);

            if (!isPasswordValid) return done(null, false, { message: 'Contrasenha incorrecta' });

            done(null, user);
        } catch (error) {
            done(error, done, { message: 'Error al autenticar usuario' })
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
        callbackURLL: process.env.GITHUB_CALLBACKURLL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let isExistUser = usersModel.findOne({ email: profile._json.email });

            if (!isExistUser) return done(null, false, { message: 'usuario ya existe' })

            let user = {
                first_name: profile._json.name,
                last_name: '',
                age: '',
                email: profile._json.email,
                password: ''
            };

            let result = await usersModel.create(user);
            console.log(result)
            done(null, result);
        } catch (error) {
            done(error, done, { message: 'Error al autenticar usuario' });
        };
    }))
}

export default initializePassport;