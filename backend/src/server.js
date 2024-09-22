import express from 'express';
import cors from 'cors';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 5353;

const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://fullsteckbyyash.vercel.app/'
        : 'http://localhost:5173'
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});