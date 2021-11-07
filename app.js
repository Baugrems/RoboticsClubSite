var express = require('express');
var app = express();
var session = require('express-session');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Team = require('./Models/team.js');
methodOverride = require("method-override");
flash = require("connect-flash");

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));



// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(flash());
// cookie parser middleware
// app.use(cookieParser());

// //username and password
// const myusername;

// // a variable to save a session
// var session;

app.get("/", function(req,res){
    res.render('home');
});


app.get("/help", function(req, res) {
    res.render('help');
});

//Test post route for teams
// app.post('/add', function(req,res) {
//     const team = new Team({
//       name: req.body.name,
//       leader: req.body.leader,
//       image: req.body.image,
//       description: req.body.description
//     });
//     team.save().then(val => {
//       res.json({ msg: "Team Added Successfully", val: val })
//     })
//   })


//Database startup
mongoose.connect("mongodb+srv://Shane:" + process.env.DBPASS + "@cluster0.5uh8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
});

//route setup
var teamRoutes    = require("./routes/teams");

app.use("/teams", teamRoutes);

//Listener to turn website on
app.listen(process.env.PORT, process.env.IP);
console.log("Robotics Club Site - Active!");
