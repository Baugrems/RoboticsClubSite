var express = require("express");
var router = express.Router();



router.get("/",(req,res) => {
    res.render("user");
})

router.post('/',(req,res) => {
        session=req.session;
        req.session.userid=req.body.username;
        session.discriminator=req.body.discriminator;
        session.avatar=req.body.avatar;
        session.discordID = req.body.id;
        res.redirect("/")
})


module.exports = router;