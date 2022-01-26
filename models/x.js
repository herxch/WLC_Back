import mongoose from 'mongoose';

const xSchema = new mongoose.Schema({
  date: { type: String, required: true },
  x: { type: Number, required: true },
});

export default mongoose.model('X', xSchema);
