import { Router, Request, Response } from "express";
import ToDo, { IToDo } from "../models/ToDo";

const router: Router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const todos: IToDo[] = await ToDo.find();
  res.json(todos);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const todo: IToDo = new ToDo(req.body);
  await todo.save();
  res.json(todo);
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const todo: IToDo | null = await ToDo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(todo);
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  await ToDo.findByIdAndDelete(req.params.id);
  res.json({ message: "To-Do deleted" });
});

export default router;
