import RecordingInput from "@/components/recording-input";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Trigger } from "@radix-ui/react-select";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div className="p-2">
      <div className="flex items-center mb-6">
        <div className="relative flex-grow">
          <Input
            placeholder="Search"
            className="w-full p-2 pl-10 border rounded-full placeholder:text-gray-400"
          />
          <Search
            size={16}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

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
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="p-4 border rounded-2xl">Task 1</Card>
        <Card className="p-4 border rounded-2xl">Task 2</Card>
        <Card className="p-4 border rounded-2xl">Task 3</Card>
        <Card className="p-4 border rounded-2xl">Task 4</Card>
      </div>
      <RecordingInput />
    </div>
  );
}
