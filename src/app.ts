import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from ConectaVet API!' });
});

app.use('/api', routes);

export default app;
