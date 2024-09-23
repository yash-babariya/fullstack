import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/User.js';

// Validation schemas
const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d).{8,}$')).required()
        .messages({
            'string.pattern.base': 'Create a strong password',
            'string.empty': 'Password is required'
        })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const JWT_SECRET = process.env.JWT_SECRET || "535325BYC";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validate input
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate new token
        const token = generateToken(user);

        // Update user's token in the database
        user.token = token;
        await user.save();

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to generate tokens
function generateToken(user) {
    const payload = {
        user: { id: user.id },
        iat: Date.now()
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Function to verify tokens
export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user || user.token !== token) {
            return null;
        }

        return decoded;
    } catch (error) {
        return null;
    }
};

// Function to refresh token
export const refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate new token
        const newToken = generateToken(user);
        user.token = newToken;
        await user.save();

        res.json({ token: newToken });
    } catch (error) {
        console.error("Token refresh error:", error);
        res.status(500).json({ message: 'Server error during token refresh' });
    }
};