const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

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
        const token = generateToken(user._id);

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // Remove password before sending user data
        const { password: _, ...userWithoutPassword } = user.toObject();

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