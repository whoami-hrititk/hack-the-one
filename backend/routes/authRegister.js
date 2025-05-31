const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const all_users = require('../users')

router.post('/register', (req, res) => {
    const username = req.body.username;
    const rawPass = req.body.pass;
    const confirmRawPass = req.body.confirm_pass;
    const email = req.body.email;

    if(!username || !rawPass || !confirmRawPass || !email){
        return res.status(400).json({message:"Missing fields", success:false});
    }

    //check both rawPass is equal to confirmRawPass
    if(rawPass != confirmRawPass){
        return res.status(401).json({message:"Password didn't matched!", success: false});
    }
    //check user already exists or not;
    if(all_users[username]){
        return res.status(409).json({message: "User already resgisterd", success:false});
    }

    const saltRound = 10;
    bcrypt.hash(rawPass, saltRound, (err, hashPass) => {
        if(err){
            return res.status(500).json({message: "Unable generate hash pass", success: false});
        }
       
        console.log("Hash Generated! User Registered..");
        
        all_users[username] ={username, hashPass, email};
        
        console.log(all_users[username]);

        req.session.user = {username, email};
        return res.status(200).json({message:"Successfully registered", success:true});
    });
});

module.exports = router;