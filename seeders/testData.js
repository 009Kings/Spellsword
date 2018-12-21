var db = require('../models');

db.movie.create({
    title: 'Mission: Impossible',
    year: 1996,
    genre: 'Action',
    runtime: 110,
    tagline: 'If you choose to accept this mission...'
})
.then((createdMovie)=>{
    console.log('Successfuly created movie', createdMovie);
})
.catch((error)=>{
    console.log('Bad news bears, there\'s been an error', error);
});