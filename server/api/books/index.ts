import BookModel from '~~/server/models/Book.model';

export default defineEventHandler(async () => {
  return await BookModel.find().populate('authors');
});
