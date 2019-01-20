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
    username: process.env.ADMIN_USERNAME,
    admin: true,
    avatar_img: process.env.ADMIN_IMG
  }
}).spread((admin, created)=>{
  if (created) {
    console.log(`${admin.username} was created!` .cyan);
  }
})