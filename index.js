// Requires
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require("body-parser");

// declar express app
var app = express();

// declare a reference to the models folder
var db = require('./models');

// Set up views
app.set('view engine', 'ejs');

// Use Middleware
app.use(layouts);
app.use('/', express.static('static'));
app.use(parser.urlencoded({ extended : false}));

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