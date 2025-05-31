const express = require('express');
const router = express.Router();

router.post('/home',(req, res) => {
    if(!req.session.user) return res.status(401).json({message:"No active session!", success:false});
    
    username = req.session.user.username;
    email = req.session.user.email;

    console.log(username);
    console.log(email);
    return res.json({message:"Session successfully loaded!", success: true, user:{username, email}});
})

module.exports = router;