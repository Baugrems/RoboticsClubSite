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
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });
var members = {};
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(flash());
app.use(cookieParser());

app.get("/", function(req,res){
    if (!req.session.officer) {
        for (let i = 0; i < members.length; i++) {
            if (members[i] == req.session.discordID) {
                req.session.officer = true;
            }
        }
    }
    res.render('home');
});


app.get("/help", function(req, res) {
    res.render('help');
});

//Database startup
mongoose.connect("mongodb+srv://Shane:" + process.env.DBPASS + "@cluster0.5uh8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
});

//route setup
var teamRoutes    = require("./routes/teams");
var userRoutes    = require("./routes/user");

app.use("/teams", teamRoutes);
app.use("/user", userRoutes);

//Listener to turn website on
app.listen(process.env.PORT, process.env.IP);
console.log("Robotics Club Site - Active!");


// BOT STUFF
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const TOKEN = process.env.TOKEN;
const OFFICER_ROLE_ID = process.env.OFFICER_ROLE_ID;


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    
  });

bot.on('message', msg => {
    if (msg.content == "Officer Update") {
        members = msg.guild.roles.cache.get(OFFICER_ROLE_ID).members.map(m=>m.user.id); // get list of officers in club
    }
});


bot.login(TOKEN);