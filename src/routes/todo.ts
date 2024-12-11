import { Router, Request, Response } from 'express';
import ToDo, { IToDo } from '../models/ToDo';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: IToDo[] = await ToDo.find({ userId: req.userId });
    res.status(200).json(todos);
  } catch (_) {
    res.status(500).json({ message: 'Error fetching To-Dos!' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const todo = new ToDo({ ...req.body, userId: req.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (_) {
    res.status(500).json({ message: 'Error creating new To-Do item' });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await ToDo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) {
      res.status(404).json({ message: 'To-Do item not found' });
      return;
    }
    res.status(201).json(todo);
  } catch (_) {
    res.status(500).json({ message: 'Error updating To-Do item' });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await ToDo.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!todo) {
      res.status(404).json({ message: 'To-Do item not found!' });
      return;
    }
    res.status(200).json({ message: 'Successfully deleted To-Do item' });
  } catch (_) {
    res.status(500).json({ message: 'Error deleting To-Do item' });
  }
});

export default router;
