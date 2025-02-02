import mongoose, { model, Schema } from "mongoose";

export interface NoteDocument {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<NoteDocument>(
  {
    title: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.models?.Note || model<NoteDocument>("Note", NoteSchema);

export default Note;
