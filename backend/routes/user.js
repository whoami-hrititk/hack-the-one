const express = require('express');
const session = require('express-session');
const router = express.Router();


router.get('/profile', (req, res) => {
    if(req.session.user){
        return res.json({message:"session fetched", success:true,  user:{username: req.session.user.username, email: req.session.user.email}});
    }else{
        return res.json({message:"unable to fetch the session", success:false});
    }
});

module.exports = router;