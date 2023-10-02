const mongoose = require('mongoose');

const profileimgschema = new mongoose.Schema({
  username: String,
  image:String,
  origimg:String,
});
const profileimgmodel = mongoose.model('profileimg', profileimgschema);
module.exports =  profileimgmodel;
