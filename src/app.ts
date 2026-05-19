import express from 'express';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.json({ message: 'Hello from ConectaVet API!' });
});

export default app;
