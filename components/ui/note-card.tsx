"use client";

import { formatCreatedAt } from "@/utils/formatDate";
import { Card, CardDescription, CardFooter, CardTitle } from "./card";
import { Button } from "./button";
import { CircleAlert, Clipboard, Pencil, Trash2 } from "lucide-react";
import { deleteNote, updateNote } from "@/app/actions/note";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Label } from "./label";
import { Input } from "./input";
import { useActionState, useEffect, useState } from "react";

interface NoteCardProps {
  title: string;
  desc: string;
  createdAt: Date;
  noteId: string;
}

const NoteCard = ({ title, desc, createdAt, noteId }: NoteCardProps) => {
  const [state, formAction, isPending] = useActionState(updateNote, undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [note, setNote] = useState({
    title,
    desc,
  });

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

  const handleChange = (e) => {
    setNote((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setIsDialogOpen(false);
  }, [state]);

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

        <Dialog open={isDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-none rounded-full"
              onClick={() => setIsDialogOpen(true)}
            >
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <form action={formAction}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    required
                    value={note.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Description</Label>
                  <Input
                    id="desc"
                    type="text"
                    name="desc"
                    required
                    value={note.desc}
                    onChange={handleChange}
                  />
                </div>

                <input type="hidden" name="noteId" value={noteId} />

                <Button
                  type="submit"
                  className="w-full"
                  aria-disabled={isPending}
                >
                  Save
                </Button>
              </div>
            </form>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
