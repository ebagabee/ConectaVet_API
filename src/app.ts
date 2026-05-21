import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000' }));
app.use(express.json());

// Servir uploads (avatars de pets, etc.) como arquivos estáticos
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from ConectaVet API!' });
});

app.use('/api', routes);

export default app;
