var express = require('express');
var app = express();
var session = require('express-session');
const cookieParser = require("cookie-parser");

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

var bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
// cookie parser middleware
// app.use(cookieParser());

// //username and password
// const myusername;

// // a variable to save a session
// var session;

app.get("/", function(req,res){
    res.render('home');
});


//Listener to turn website on
app.listen(process.env.PORT, process.env.IP);
console.log("Robotics Club Site - Active!");