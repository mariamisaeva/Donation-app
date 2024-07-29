import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import paypal from './paypal'; //paypal configuration
import paypalRoutes from './routes/paypalRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello From The Backend!' });
});

//MAIN ROUTES
app.use('/api/paypal', paypalRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
