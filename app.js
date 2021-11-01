var express = require('express');
var app = express();
var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.render('home');
});


//Listener to turn website on
app.listen(process.env.PORT, process.env.IP);
console.log("Robotics Club Site - Active!");