// Requires
var express = require('express');

// declar express app
var app = express();

// Declare routes

app.get('/', (req, res)=> {
    res.send('Hello World')
});

// Listen on a port
app.listen("3000", ()=> {
    console.log('You\'re listening to the smooth sounds of port 3000')
});