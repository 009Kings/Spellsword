// Requires
var express = require('express');

// declar express app
var app = express();

// Set up views
app.set('view engine', 'ejs');

// Declare routes

app.get('/', (req, res)=> {
    res.render('home')
});

// Listen on a port
app.listen("3000", ()=> {
    console.log('You\'re listening to the smooth sounds of port 3000')
});