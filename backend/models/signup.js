const mongoose = require('mongoose');

const signupschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmpassword: String,
});
const signupmodel = mongoose.model('signup', signupschema);
module.exports = signupmodel;
