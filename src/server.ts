import express, { Application } from 'express';
import connectDB from './config/db';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
