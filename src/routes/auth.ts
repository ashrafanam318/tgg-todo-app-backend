import { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

const getToken = (user: IUser) =>
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '2d',
  });

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }
    const user = new User({ username, password });
    await user.save();
    const token = getToken(user);
    res.status(201).json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: 'User not found!' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Wrong password provided!' });
    }

    const token = getToken(user);
    res.status(200).json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
