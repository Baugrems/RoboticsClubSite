var mongoose = require("mongoose");
 
var teamSchema = new mongoose.Schema({
   name: String,
   leader: String,
   image: String,
   description: String,
   meeting1: String,
   meeting2: String
});
 
module.exports = mongoose.model("Team", teamSchema);