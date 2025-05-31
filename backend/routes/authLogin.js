const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    const saltRound = 10;

    if(!all_users[username]){
        return res.status(404).json({message:"User Not found!", success:false});
    }
    if(!username || !pass){
        return res.status(400).json({msessage:"User identity/password not found!", success:false});
    }
    bcrypt.hash(pass, saltRound, (err, userhashPass) => {
        if(err){
            return res.status(500).json({message:"Unable to generate compare hash pass!", success:false});
        }
        
        if(userhashPass == all_users[username][hashPass]){
            req.session.user = {username, email};
            console.log("User Successfully logged in!");
            res.status(200).json({message:"Logged In!", success:true});
        }else{
            res.status(401).json({message:"Invalid Credentials", success:false});
        }
    });
});

module.exports = router;