import BookModel from '~~/server/models/Book.model';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    await BookModel.findByIdAndDelete(id);
    return { message: 'Book removed' };
  } catch (e) {
    throw createError({
      message: e.message
    });
  }
});
