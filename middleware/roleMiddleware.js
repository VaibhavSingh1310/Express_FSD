const checkroles = (...allowedroles)=>{
    return (req,res,next)=>{
        const role = req.headers.role;
        if(!role){
            return res.status(404).json({message:"Role is not provided"});
        }
        if(allowedroles.includes(role)){
            next();
        }
        else{
            return res.status(403).json({
                message:"You are not allowed to visit this page"
            })
        }
    }

}
module.exports = checkroles;