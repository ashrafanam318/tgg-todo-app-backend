import express, { Application } from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import connectDB from './config/db';
import todoRoutes from './routes/todo';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
