import mongoose from 'mongoose';

const pwSchema = new mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('WlPw', pwSchema);
