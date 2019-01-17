var async = require('async');
var colors = require('colors');
var db = require('./models');
var request = require('request');

// TODO: figure out why ' is coming out at â€™ (UTF-8 issue, not sure how to fix it)


async.series([(callback)=>{
  // Populates Classes
  request('http://www.dnd5eapi.co/api/classes/1', (error, response, body)=>{
    if(error || response.statusCode !=200){
      console.log(`Bad news bears! There's been an error in Request for the class` .magenta);
    } else {
      console.log('Populating number one!' .magenta);
      console.log('1' .white);
      callback(null, 'One')
    }
  });
}, (callback)=>{
  request('http://www.dnd5eapi.co/api/classes/2', (error, response, body)=>{
    if(error || response.statusCode !=200){
      console.log(`Bad news bears! There's been an error in Request for the class` .magenta);
    } else {
      console.log('Populating number two!' .magenta);
      console.log('2' .white);
      callback(null, 'Two');
    }
  });
}, (callback)=>{
  request('http://www.dnd5eapi.co/api/classes/3', (error, response, body)=>{
    if(error || response.statusCode !=200){
      console.log(`Bad news bears! There's been an error in Request for the class` .magenta);
    } else {
      console.log('Populating number three!' .magenta);
      console.log('3' .white);
      callback(null, 'Three');
    }
  });
}], (err, results)=>{
  console.log(`${results}` .green);
})