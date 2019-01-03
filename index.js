// Load up environment variable
require("dotenv").config();

// Requires
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");

// declar express app
var app = express();

// declare a reference to the models folder
//var db = require('./models');

// Set up views
app.set('view engine', 'ejs');

// Use Middleware
app.use(layouts);
app.use('/', express.static('static'));
app.use(parser.urlencoded({ extended : false}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Homebrew Middleware - write data to locals
app.use(function (req, res, next){
  res.locals.alerts = req.flash();
  next();
});

// Declare routes
app.get('/', (req, res)=> {
  res.render('home');
});

// Include any controllers
app.use("/auth", require("./controllers/auth"));

// Listen on a port
app.listen("3000", ()=> {
    console.log('You\'re listening to the smooth sounds of port 3000 ♨︎')
});