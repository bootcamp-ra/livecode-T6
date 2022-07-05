import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(transactionRoutes);

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
  console.log('Servidor funfou!!!');
});
