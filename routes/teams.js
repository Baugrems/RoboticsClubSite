var express = require("express");
var router = express.Router();
var Team = require("../Models/team");

function requireLogin(req, res, next) {
    if (!req.session.officer) {
        res.redirect('/');
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
             req.flash("success", updatedTeam.name + " Updated Successfully!")
             res.redirect("/teams/" + req.params.id);
         }
     });
 });
 
 //DELETE ROUTE
 router.delete("/:id", requireLogin, function(req, res){
     Team.findByIdAndRemove(req.params.id, function(err){
         if(err){
             res.redirect("/teams");
         } else {
             res.redirect("/teams");
             req.flash("success", "Team Deleted Successfully");
         }
     });
 });

module.exports = router;