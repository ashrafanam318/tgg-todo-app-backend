import mongoose, { Schema, Document } from 'mongoose';

export interface IToDo extends Document {
  title: string;
  completed: boolean;
  userId: string;
}

const ToDoSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IToDo>('ToDo', ToDoSchema);
