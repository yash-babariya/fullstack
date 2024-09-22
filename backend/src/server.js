import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5353;

// Determine if we're in production based on NODE_ENV or VERCEL env variable
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

const corsOptions = {
    origin: isProduction
        ? 'https://fullsteckbyyash.vercel.app'
        : 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Only start the server if we're not in a Vercel environment
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;