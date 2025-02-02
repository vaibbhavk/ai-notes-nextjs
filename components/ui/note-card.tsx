"use client";

import { formatCreatedAt } from "@/utils/formatDate";
import { Card, CardDescription, CardFooter, CardTitle } from "./card";
import { Button } from "./button";
import { Clipboard, Delete, Trash, Trash2 } from "lucide-react";
import { deleteNote } from "@/app/actions/note";

interface NoteCardProps {
  title: string;
  desc: string;
  createdAt: Date;
  noteId: string;
}

const NoteCard = ({ title, desc, createdAt, noteId }: NoteCardProps) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(desc)
      .then(() => {
        alert("Description copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleDelete = async () => {
    await deleteNote(undefined, noteId);
  };

  return (
    <Card className="p-4 border rounded-2xl min-h-72 space-y-4 shadow-sm h-full flex flex-col justify-between">
      <CardDescription className="text-xs text-gray-400 font-semibold">
        {formatCreatedAt(createdAt)}
      </CardDescription>

      {title && <CardTitle>{title}</CardTitle>}

      <CardDescription className="font-semibold  flex-1">
        {desc}
      </CardDescription>

      <CardFooter className="flex justify-end items-center text-sm text-gray-500">
        <Button
          variant="outline"
          size="icon"
          className="border-none rounded-full"
          onClick={copyToClipboard}
        >
          <Clipboard />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-none rounded-full"
          onClick={handleDelete}
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
