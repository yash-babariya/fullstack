import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';
import router from './routes/authRoutes.js';


const app = express();
const PORT = process.env.PORT || 5353;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend' });
});

// API routes
app.use('/api', apiRoutes);
// Auth routes
app.use('/api/auth', router);

app.get('*', (req, res) => {
    res.status(404).json({ message: '404: Page not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;