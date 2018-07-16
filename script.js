const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
let profileObject = {};
const config = require('./config.js');
const app = express();


app.get('/', (req, res) => {
    res.send('hellow all right')
});

app.listen(3000);
