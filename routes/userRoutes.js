const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const checkroles = require('../middleware/roleMiddleware');
const userModel = require('../models/userModel');

//get current user
router.get('/',async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            message:"User not logged in"
        })
    }
    const user = await userModel.findById(token);
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    res.status(200).json({user:user})
})

//here we are creating a new user and saving it to the database
router.post('/createUser',async(req,res)=>{
    const {name, email, password,role} = req.body;
    if(!name || !email || !password){
        res.status(400).json({
            message:"field must provided"
        })
    }
    const user = await userModel.findOne({email:email});
    if(user)res.status(409).json({message:"user already exists"});
    const pass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
        name:name,
        email:email,
        password:pass,
        role:role
    })
    if(!newUser) res.status(400).json({
        message:"something went wrong"
    })
    res.status(201).json({
        message:"user created successfully",
        user:newUser
    });
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"email and password must be provided"
            })
        }
        const user = await userModel.findOne({email:email});
        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        res.status(200).json({
            message:"login successful",
            user:user
        })
}catch(err){
        res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
    } 
})


module.exports = router;