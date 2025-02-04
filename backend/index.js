import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { dbConnect } from './config/db.js';

dotenv.config();

const app = express();

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
  })
);

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Alhamdulillah! Api is working')
})

app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`)
})