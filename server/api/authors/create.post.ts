import AuthorModel from '~~/server/models/Author.model';
import { AuthorSchema } from '~~/server/validation';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { error } = AuthorSchema.validate(body);
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ''),
      statusCode: 400,
      fatal: false
    });
  }

  try {
    await AuthorModel.create(body);
    return { message: 'Author created' };
  } catch (e) {
    throw createError({
      message: e.message
    });
  }
});
