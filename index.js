// Load up environment variable
require("dotenv").config();

// Requires
var express = require('express');
var flash = require("connect-flash");
var layouts = require('express-ejs-layouts');
var methodOverride= require('method-override');
var parser = require("body-parser");
var passport = require('./config/passportConfig');
var session = require("express-session");

// declar express app
var app = express();

// Set up views
app.set('view engine', 'ejs');

// Use Middleware
app.use(methodOverride('_method'));
app.use(layouts);
app.use('/', express.static('static'));
app.use(parser.urlencoded({ extended : false}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Homebrew Middleware - write data to locals
app.use(function (req, res, next){
  res.locals.alerts = req.flash();
  res.locals.user = req.user;
  next();
});

// Declare routes
app.get('/', (req, res)=> {
  res.render('home');
});

// Include any controllers
app.use("/auth", require("./controllers/auth"));
app.use("/profile", require("./controllers/profile"));
app.use("/spells", require("./controllers/spells"));

// Listen on a port
app.listen(process.env.PORT || 3010, ()=> {
    console.log(`You're listening to the smooth sounds of port 3010 ♨︎`)
});