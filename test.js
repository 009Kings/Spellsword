const async = require('async');

const schools=["first school", "second school", "third school"];

function addSchoolToDB(school){
	console.log("Adding"+school+" to DB");
	return school+"has been found from the database";
}

function errorMessage(err){
	console.log("Here is the error:", err);
}


//get each title, then print the results
async.concat(schools, addSchoolToDB, function(err, results) {
  console.log("results: "+results);
});