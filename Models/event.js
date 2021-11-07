var mongoose = require("mongoose");
 
var eventSchema = new mongoose.Schema({
   title: String,
   date: String,
   description: String,
});
 
module.exports = mongoose.model("Event", eventSchema);