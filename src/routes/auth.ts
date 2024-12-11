import { Router, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

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
    res.status(201).json({ message: 'User registered successfully' });
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

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '2d' }
    );
    res.status(200).json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
