var express = require("express");
var router = express.Router();
var Team = require("../Models/team");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/906699267262013440/O9xAzYx0OwNQsvELUuBFRQaa37sH6Oyart9F6lZmetg8Z3H70IP938qUEThwP1oYU_51");
 

hook.setUsername('Robotics Website Logger');



function requireLogin(req, res, next) {
    if (!req.session.officer) {
        res.redirect('/badAuth');
      } else {
        next();
      }
  }

router.get("/", function(req, res){
    Team.find({}, function(err, teams){
        if(err){
            console.log(err);
        } else {
            res.render("teams/index", {teams: teams});    
        }
    });
});

router.post("/", requireLogin, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var leader = req.body.leader;
    var newTeam = {name: name, image: image, description: description, leader: leader};
    Team.create(newTeam, function(err, newlyCreatedTeam){
        if(err){
            console.log(err);
        } else {
            res.redirect("/teams");
            var msg = req.session.userid + " created a new team! " + newlyCreatedTeam.name + " has been created.";

            hook.send(msg);
        }
    });
});


router.get("/new", requireLogin, function(req, res){
    res.render("teams/new"); 
 });
 
 router.get("/:id", function(req, res){
     Team.findById(req.params.id, function(err, foundTeam){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else { 
             res.render("teams/show", {team: foundTeam});
        }
     });
 });
 
 //EDIT ROUTE
 router.get("/:id/edit", requireLogin, function(req, res){
         Team.findById(req.params.id, function(err, team){
             if(err){
                 req.flash("error", err.message);
                 res.redirect("back");
             } else {
                 res.render("teams/edit", {team: team});
             }
     });
 });
 
 //UPDATE ROUTE
 router.put("/:id", requireLogin, function(req, res){
     Team.findByIdAndUpdate(req.params.id, req.body.team, function(err, updatedTeam){
         if(err){
             res.redirect("/teams");
         } else {
            var msg = req.session.userid + " edited " + updatedTeam.name + "!";

            hook.send(msg);
            res.redirect("/teams");
         }
     });
 });
 
 //DELETE ROUTE
 router.delete("/:id", requireLogin, function(req, res){
     Team.findByIdAndRemove(req.params.id, function(err){
         if(err){
             res.redirect("/teams");
         } else {
            var msg = req.session.userid + " deleted a team!";
            hook.send(msg);
            res.redirect("/teams");
         }
     });
 });

module.exports = router;