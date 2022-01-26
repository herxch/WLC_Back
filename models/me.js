import mongoose from 'mongoose';

const meSchema = new mongoose.Schema({
  date: { type: String, required: true },
  me: { type: Number, required: true },
});

export default mongoose.model('Me', meSchema);
