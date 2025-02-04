import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import { dbConnect } from './config/db.js';

dotenv.config();

const app = express();

dbConnect();

app.use(express.json());
app.use(cookieParser());

cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.get('/', (req, res) => {
  res.send('Alhamdulillah! Api is working')
})

app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`)
})