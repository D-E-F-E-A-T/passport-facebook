var https = require('https')
var pem = require('pem');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
let profileObject = {};
const config = require('./config.js');
const app = express();

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(obj, done) {
  return done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        profileObject = {
            profile: profile
        }
        done(null, profile)
    }
));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());



pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err
  }

  app.get('/', (req, res) => {
      res.render('home')
  });

  app.get('/login', (req, res) => {
      res.render('logged')
  })

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'read_stream' }));

  app.get('auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
  }))

  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(3000)
})
