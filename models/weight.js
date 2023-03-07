import mongoose from "mongoose";

const xSchema = new mongoose.Schema({
  date: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

export default mongoose.model("Weight", xSchema);
