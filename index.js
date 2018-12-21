// Requires
var express = require('express');

// declar express app
var app = express();

// declare a reference to the models folder
var db = require('./models');

// Set up views
app.set('view engine', 'ejs');

// Declare routes

app.get('/', (req, res)=> {
    db.movie.findAll()
    .then((movieResults)=>{
        res.render('home', {movieResults: movieResults})
    }).catch((err)=>{
        console.log(`Bad news bears, there's been an ${err}`);
        res.send('Error, check your logs');
    })
});

// Listen on a port
app.listen("3000", ()=> {
    console.log('You\'re listening to the smooth sounds of port 3000')
});