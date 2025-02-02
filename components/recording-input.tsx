"use client";

import { Button } from "./ui/button";
import RecordingControls from "./recording-controls";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Images, Pencil } from "lucide-react";

const RecordingInput = () => {
  const [text, setText] = useState("");

  return (
    <div className="max-w-4xl mx-auto fixed bottom-0 left-0 md:left-[17rem] right-0 bg-white flex items-end py-4">
      <div className="relative mx-auto w-full">
        <Textarea
          className="flex-grow resize-none pl-24 pr-44 rounded-full no-scrollbar"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

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
          <RecordingControls setText={setText} />
        </div>
      </div>
    </div>
  );
};

export default RecordingInput;
