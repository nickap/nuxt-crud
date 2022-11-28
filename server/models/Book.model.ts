import mongoose from 'mongoose';

const schema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      requied: true
    },
    published: {
      type: Date,
      required: true
    },
    isbn: String,
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
      }
    ],
    pageCount: Number
  },
  { timestamps: true }
);

export default mongoose.model('Book', schema);
