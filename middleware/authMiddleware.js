const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next)=>{
    try{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            message: "token not found"
        })
    }
    const decoded = jwt.verify(token,SECRET_KEY)
    req.user = decoded;
    next();
}catch(err){
    return res.status(500).json({
        message: "something went wrong",
    })
}
}
module.exports = authMiddleware;