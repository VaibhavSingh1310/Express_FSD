const userModel = require("../model/userModel");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const logUser=async(req,res)=>{
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
            //token generation can be added here for authentication purposes
            const token = generateToken(user._id);
            res.cookie("token",token,{
                httpOnly:true,
                secure : process.env.SECRET_KEY,
                maxAge:3600000
            })
            
            res.status(200).json({
                message:"login successful",
                user:user,
                token:token
            })
    }catch(err){
            res.status(500).json({
                message:"something went wrong",
                error:err.message
            })
        } 
}
module.exports = {logUser};