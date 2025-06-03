const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const all_users = require('../users');

router.post('/login', (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    const saltRound = 10;

    const user = all_users[username];

    if(!username || !pass){
        return res.status(400).json({message:"Missing Fields", success:false});
    }
    if(!user){
        return res.status(404).json({message:"User Not found!", success:false});
    }
    
    bcrypt.compare(pass, user.hashPass, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: "Error comparing passwords", success: false });
        }

        if (isMatch) {
            req.session.user = {
                username: username,
                email: user.email
            };
            console.log("User successfully logged in!");
            res.status(200).json({ message: "Logged In!", success: true});
        } else {
            res.status(401).json({ message: "Invalid credentials", success: false });
        }
    });
});

module.exports = router;
