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

export const signup = async (req, res) => {
    try {
        // Validate input
        const { error } = signupSchema.validate(req.body);
        if (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }

        const { username, email, password } = req.body;

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

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

export const login = async (req, res) => {
    try {
        // Validate input
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
};