const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');


router.post('/register', async (req, res) => {
    const username = req.body.username;
    const rawPass = req.body.pass;
    const confirmRawPass = req.body.confirm_pass;
    const email = req.body.email;

    //load user if exists
    const [checkUser, checkEmail] = await Promise.all([User.findOne({username:username}), User.findOne({email:email})]);

    //missing fields
    if(!username || !rawPass || !confirmRawPass || !email){
        return res.status(400).json({message:"Missing fields", success:false});
    }

    //check both rawPass is equal to confirmRawPass
    if(rawPass != confirmRawPass){
        return res.status(401).json({message:"Password didn't matched!", success: false});
    }
    //check user already exists or not;
    if(checkUser || checkEmail){
        return res.status(409).json({message: "User already resgisterd", success:false});
    }

    const saltRound = 10;
    bcrypt.hash(rawPass, saltRound, async (err, hashPass) => {
        if(err){
            return res.status(500).json({message: "Unable generate hash pass", success: false});
        }
       
        console.log("Hash Generated! User Registered..");
        //saving user data to db;
        const new_user = new User({username, email, hashPass});
        await new_user.save();
        req.session.user = {username, email};

        return res.status(200).json({message:"Successfully registered", success:true});
    });
});

module.exports = router;