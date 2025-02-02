import { auth } from "@/auth";
import RecordingInput from "@/components/recording-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import NoteCard from "@/components/ui/note-card";
import NotesSearch from "@/components/ui/notes-search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { connectDB } from "@/lib/db";
import Note, { NoteDocument } from "@/models/Note";
import { formatCreatedAt } from "@/utils/formatDate";
import { Trigger } from "@radix-ui/react-select";
import { Clipboard, Images, SlidersHorizontal } from "lucide-react";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  const { search } = await searchParams;

  const searchTerm = typeof search === "string" ? search : undefined;

  await connectDB();
  const query = searchTerm
    ? { userId, $text: { $search: searchTerm } }
    : { userId };

  const notes = await Note.find(query).sort({ createdAt: -1 });

  return (
    <div className="p-2">
      <div className="flex items-center mb-6">
        <NotesSearch search={typeof search === "string" ? search : ""} />

        <Select>
          <Trigger className="flex h-9 w-20 ml-2 items-center justify-between whitespace-nowrap rounded-full border border-input bg-gray-100 px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
            <SlidersHorizontal size={16} />
            <SelectValue placeholder="Sort" />
          </Trigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="old_to_new">Date: Old to New</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-24">
        {notes.map((note: NoteDocument, index: number) => (
          <NoteCard
            title={note.title}
            desc={note.desc}
            createdAt={note.createdAt}
            noteId={note._id.toString()}
            key={index}
          />
        ))}
      </div>
      <RecordingInput userId={session?.user?.id} />
    </div>
  );
}
