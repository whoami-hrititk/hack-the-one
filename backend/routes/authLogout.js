const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    if(req.session.user){
        req.session.destroy( err => {
            if(err){
                return res.status(500).json({message:"Logout Failed!", success:false});
            }
            res.clearCookie('connect.sid');
            res.status(200).json({message:"Logout!", success: true});
        });
    }else{
        res.status(401).json({message:"No session active!", success:true});
    }
});

module.exports = router;