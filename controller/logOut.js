const express = require('express');
const router = express.Router();
router.post('/logout',(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            message:"User not logged in"
        })
    }
    res.clearCookie("token");
    return res.status(200).json({
        message: "Logout successful"
    });
})
module.exports = router;