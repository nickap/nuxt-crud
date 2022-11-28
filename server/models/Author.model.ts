import mongoose from 'mongoose';

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Author', schema);
