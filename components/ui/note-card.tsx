"use client";

import { formatCreatedAt } from "@/utils/formatDate";
import { Card, CardDescription, CardFooter, CardTitle } from "./card";
import { Button } from "./button";
import { Clipboard, Maximize2, Minimize2, Trash2 } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen mode
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          );
        });
    } else {
      // Exit fullscreen mode
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error(
            `Error attempting to exit fullscreen mode: ${err.message} (${err.name})`
          );
        });
    }
  };

  useEffect(() => {
    setIsDialogOpen(false);
  }, [state]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Card
          onClick={() => setIsDialogOpen(true)}
          className="p-4 border rounded-2xl cursor-pointer min-h-72 space-y-4 shadow-sm h-full flex flex-col justify-between transform transition-transform hover:shadow-none"
        >
          <CardDescription className="text-xs text-gray-400 font-semibold">
            {formatCreatedAt(createdAt)}
          </CardDescription>

          {title && <CardTitle>{title}</CardTitle>}

          <CardDescription className="font-semibold  flex-1">
            {desc}
          </CardDescription>

          <CardFooter className="flex justify-end items-center text-sm text-gray-500 relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 border-none rounded-full"
              onClick={copyToClipboard}
            >
              <Clipboard />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-14 border-none rounded-full"
              onClick={handleDelete}
            >
              <Trash2 />
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl pt-14">
        <DialogHeader>
          <DialogTitle className="sr-only">Note Details</DialogTitle>
        </DialogHeader>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-4 border-none rounded-full bg-secondary"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize2 /> : <Maximize2 />}
        </Button>

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

            <Button type="submit" className="w-full" aria-disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteCard;
