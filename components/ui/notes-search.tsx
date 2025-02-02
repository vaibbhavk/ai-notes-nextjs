"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const NotesSearch = ({ search }: { search?: string }) => {
  const [searchTerm, setSearchTerm] = useState(search);
  const router = useRouter();
  const [query] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!query) {
      router.push("/");
    } else {
      router.push(`/?search=${query}`);
    }
  }, [query, router]);

  return (
    <div className="relative flex-grow">
      <Input
        placeholder="Search"
        className="w-full p-2 pl-10 border rounded-full placeholder:text-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search
        size={16}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default NotesSearch;
