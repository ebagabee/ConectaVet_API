import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from ConectaVet API!' });
});

app.use('/api', routes);

export default app;
