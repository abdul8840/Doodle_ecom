import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import colorRoutes from './routes/colorRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { dbConnect } from './config/db.js';

dotenv.config();

const app = express();

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
  })
);

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/color', colorRoutes)
app.use('/api/product', productRoutes)

app.get('/', (req, res) => {
  res.send('Alhamdulillah! Api is working')
})

app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`)
})