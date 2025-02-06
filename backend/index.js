import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import colorRoutes from './routes/colorRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { dbConnect } from './config/db.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from "url";


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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.ensureDirSync(path.join(__dirname, 'public/images/products'));
fs.ensureDirSync(path.join(__dirname, 'public/images/blogs'));

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/color', colorRoutes)
app.use('/api/product', productRoutes)
app.use("/api/upload", uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'public/images')));

app.get('/', (req, res) => {
  res.send('Alhamdulillah! Api is working')
})

app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`)
})