const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const regUser = async(req,res)=>{
    try{
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
    }catch(err){
        return res.status(500).json({
            message:"something went wrong",
        })
    }
}
module.exports = {regUser};
