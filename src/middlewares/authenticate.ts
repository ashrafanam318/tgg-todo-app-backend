import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface ProtectedRequest extends Request {
  userId?: string;
}

const authenticate = (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  const [bearer, token] = req.headers.authorization?.split(' ') || [];
  if (bearer !== 'Bearer' || !token) {
    res
      .status(401)
      .json({ message: 'No auth token found! Authorization denied.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid auth token' });
  }
};

export default authenticate;
