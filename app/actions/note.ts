"use server";

import { connectDB } from "@/lib/db";
import { createNoteSchema } from "@/lib/zod";
import Note from "@/models/Note";
import { parseZodErrors } from "@/utils/parseZodErrors";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function createNote(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await connectDB();
    const { desc } = await createNoteSchema.parseAsync({
      desc: formData.get("desc"),
    });

    const userId = formData.get("userId");
    const title = "";

    // Create a new note
    const newNote = new Note({
      title,
      desc,
      userId,
    });

    await newNote.save();

    console.log("Note added successfully:", newNote);

    revalidatePath("/");

    return `Note added successfully ${newNote._id}`;
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = parseZodErrors(error);
      return errorMessages[0];
    }
    console.error("Error while creating note", error);
    return "Something went wrong";
  }
}

export async function deleteNote(
  prevState: string | undefined,
  noteId: string
) {
  try {
    await connectDB();

    await Note.findByIdAndDelete(noteId);

    console.log("Note deleted successfully");

    revalidatePath("/");
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = parseZodErrors(error);
      return errorMessages[0];
    }
    console.error("Error while creating note", error);
    return "Something went wrong";
  }
}
