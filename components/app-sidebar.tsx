"use client";

import * as React from "react";
import { House, Star } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";
import { UserDocument } from "@/models/User";

// This is sample data.
const data = {
  user: {
    name: "vk",
    email: "vaibhav.vk2128@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "Favorites",
      url: "/favorites",
      icon: Star,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: Session | null;
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user as UserDocument} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
