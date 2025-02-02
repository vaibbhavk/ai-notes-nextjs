"use client";

import { Button } from "./ui/button";
import RecordingControls from "./recording-controls";
import { useActionState, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Images, Pencil, Plus } from "lucide-react";
import { createNote } from "@/app/actions/note";

const RecordingInput = ({ userId }: { userId: string }) => {
  const [text, setText] = useState("");
  const [state, formAction, isPending] = useActionState(createNote, undefined);

  useEffect(() => {
    if (state === "success") {
      setText("");
    }
  }, [state]);

  return (
    <div className="max-w-4xl mx-auto fixed bottom-0 left-0 md:left-[17rem] right-0 bg-white flex items-end py-4">
      <form className="relative mx-auto w-full" action={formAction}>
        <Textarea
          className="flex-grow resize-none pl-24 pr-44 rounded-full no-scrollbar"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input type="hidden" name="userId" value={userId} />

        <div className="absolute left-0 bottom-0">
          <div className="flex items-center justify-between m-3">
            <Button
              variant="outline"
              size="icon"
              className="border-none rounded-full"
            >
              <Pencil />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-none rounded-full"
            >
              <Images />
            </Button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0">
          <div className="flex items-center justify-between m-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full mr-3"
              type="submit"
            >
              <Plus />
            </Button>
            <RecordingControls setText={setText} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecordingInput;
