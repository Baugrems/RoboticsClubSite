var mongoose = require("mongoose");
 
var userSchema = new mongoose.Schema({
   username: String,
   discriminator: String,
   avatar: String,
   
});
 
module.exports = mongoose.model("User", userSchema);