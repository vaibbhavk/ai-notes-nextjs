import { ZodError } from "zod";

export function parseZodErrors(error: ZodError) {
  const errorMessages: string[] = [];

  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      errorMessages.push(err.message);
    }
  });

  return errorMessages;
}
