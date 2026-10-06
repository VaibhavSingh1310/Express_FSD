const checkroles = (...allowedroles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({message:"User is not authenticated"});
        }
        if(!allowedroles.includes(req.user.role)){
            return res.status(403).json({message:"You are not allowed to visit this page"});
            
        }
        next();
    }

}
module.exports = checkroles;