var db = require('../models');

db.movie.create({
    title: 'Die Hard',
    year: 1988,
    genre: 'Christmas',
    runtime: 132,
    tagline: 'Yipee Kai-yay motherfucker'
})
.then((createdMovie)=>{
    console.log('Successfuly created movie');
})
.catch((error)=>{
    console.log('Bad news bears, there\'s been an error', error);
});