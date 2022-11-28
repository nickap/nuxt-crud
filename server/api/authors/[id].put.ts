import AuthorModel from '~~/server/models/Author.model';
import { AuthorSchema } from '~~/server/validation';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params.id;

  const { error } = AuthorSchema.validate(body, { abortEarly: true, allowUnknown: true });
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ''),
      statusCode: 400,
      fatal: false
    });
  }

  try {
    await AuthorModel.findByIdAndUpdate(id, body);
    return { message: 'Author updated' };
  } catch (e) {
    throw createError({
      message: e.message
    });
  }
});
