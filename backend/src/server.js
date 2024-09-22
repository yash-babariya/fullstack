import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Serve static files from the React frontend app
app.use(express.static(new URL('../../frontend/build', import.meta.url).pathname));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(new URL('../../frontend/build/index.html', import.meta.url).pathname);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;