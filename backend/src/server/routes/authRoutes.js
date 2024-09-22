import express from 'express';
import { signup, login, refreshToken } from '../controllers/authController.js';
import tokenCheck from '../middleware/auth.js'
import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from authRoutes');
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

router.get('/user', tokenCheck, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;