'use strict';

const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
let db = require('./db');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');

passport.use(new Strategy(
    function (username, password, cb) {
        db.user.findUserByName(username, function (err, user) {
            console.log(err,username,password);
            if (err) {
                console.log(err);
                console.log("in",1);
                return cb(err);
            }
            if (!user) {
                console.log(err);
                console.log("in",2);
                return cb(null, false);
            }
            /*if (!bcrypt.compareSync(password, user.password)) {
                return cb(null, false);
            }*/
            if (password!==user.password) {
                console.log(password,user.password);
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));


passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    db.user.findUserById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});



// Create a new Express application.
let app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

let offer_service = require('./routes/offer_service')(express, db);
let user_service = require('./routes/user_service')(express,passport, db);

app.use('/offer', offer_service);
app.use('/user', user_service);


connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

app.get('/',
    function (req, res) {
        res.render('index.html');
    });

app.get('/index',
    function (req, res) {
        res.render('index.html');
    });

app.get('/user_page',
    function (req, res) {
        res.render('user_page.html');
    });

function listen () {
    app.listen(process.env.PORT || 5000,()=>{
        console.log("Server started at "+(process.env.PORT || 5000));
    });
}

function connect () {
    return mongoose.connect("mongodb://localhost:27017/tradeo").connection;
}
