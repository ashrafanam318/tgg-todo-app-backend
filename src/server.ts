import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import todoRoutes from './routes/todo';
import authRoutes from './routes/auth';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

export default app;
