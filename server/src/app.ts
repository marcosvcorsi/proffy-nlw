import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', (request, response) => {
  return response.send();
});

export default app;
