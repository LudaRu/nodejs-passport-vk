const express = require('express');
const passport = require('passport');
const app = express();

const VkStrategy = require('passport-vkontakte').Strategy;


// Настройка паспорта
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new VkStrategy({
        clientID:     '', // ID приложения
        clientSecret: '', // Защищённый ключ
        callbackURL:  "http://127.0.0.1:3000/auth/vkontakte/callback" // Доверенный redirect URI:
    },
    (accessToken, refreshToken, params, profile, done) => {
    console.log(profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('params', params);
        const err = false, user = {name: 123123, password: 123123};
        return done(err, user);
    }
));



// Куда идёт пользователь при авторизации через ВК
app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

// Редирект от ВК
app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    successRedirect: '/succ',
    failureRedirect: '/fatal'
}));

app.get('/succ', (req, res) => {
    res.send('Hello Успех!');
});

app.get('/fatal', (req, res) => {
    res.send('Hello fatal!');
});

module.exports = app;