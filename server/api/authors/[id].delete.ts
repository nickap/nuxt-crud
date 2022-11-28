import AuthorModel from '~~/server/models/Author.model';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    await AuthorModel.findByIdAndDelete(id);
    return { message: 'Author removed' };
  } catch (e) {
    throw createError({
      message: e.message
    });
  }
});
