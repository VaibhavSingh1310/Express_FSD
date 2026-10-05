const jwt = require('jsonwebtoken');
const generateToken = (userId) => {
    jwt.sign(
    {
        id: user._id,
        email : user.email
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    }
)
}
module.exports = generateToken;