const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { generateTokenAccess,generateTokenRefresh } = require("../utils/jwt");

const logUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password must be provided"
            });
        }

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "user not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "invalid credentials"
            });
        }

        // Generate token
        const accessToken = generateTokenAccess(user);
        const refreshToken = generateTokenRefresh(user);

        ///access token
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15*60*1000 // 15 minutes
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7*24*60*60*1000 // 7 days
        });
        return res.status(200).json({
            message: "login successful",
            user: userWithoutPassword
        });
    } catch (err) {
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        });
    }
};

module.exports = { logUser };