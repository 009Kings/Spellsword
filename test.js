require("dotenv").config();

var colors = require('colors');
var db = require('./models');


// Populate an admin
db.user.findOrCreate({
  where: {
    email: process.env.ADMIN_EMAIL
    },
  defaults: {
    password: process.env.ADMIN_PASSWORD,
    username: 'The King',
    admin: true,
    avatar_img: 'https://imgur.com/iCj4fbg'
  }
}).spread((admin, created)=>{
  if (created) {
    console.log(`${admin.username} was created!` .cyan);
  }
})