import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import { Retell } from 'retell-sdk';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(compression()); // Enable Gzip compression
app.use(cors());
app.use(express.json());

const retell = new Retell({
    apiKey: process.env.RETELL_API_KEY || '',
});

app.post('/api/create-web-call', async (req, res) => {
    const { agent_id } = req.body;

    if (!agent_id) {
        return res.status(400).json({ error: 'agent_id is required' });
    }

    try {
        const callResponse = await retell.call.createWebCall({
            agent_id: agent_id,
        });
        res.json(callResponse);
    } catch (error) {
        console.error('Error creating web call:', error);
        res.status(500).json({ error: 'Failed to create web call' });
    }
});

// Serve frontend dist files with caching
app.use(express.static(path.join(__dirname, '../../frontend/dist'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
