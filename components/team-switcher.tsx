"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

export function TeamSwitcher() {
  return (
    <div className="flex gap-3 p-2 border-b-2 border-b-gray-100 items-center ">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>

      <h3 className="font-semibold">AI Notes</h3>
    </div>
  );
}
