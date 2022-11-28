import AuthorModel from '~~/server/models/Author.model';

export default defineEventHandler(async () => {
  // return all authors
  return await AuthorModel.find();
});
