"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  BookOpenText,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Gauge,
  Landmark,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const data = {
    user: {
      name: "Ola Nordmann",
      email: "ola@selskap.no",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Selskap1 AS",
        logo: GalleryVerticalEnd,
      },
    ],
    navMain: [
      {
        title: "Regnskap",
        url: "#",
        icon: BookOpenText,
        isActive: true,
        items: [
          {
            title: "Bokføring",
            url: "http://localhost:3000/accounting/voucherRegistration",
            isActive: usePathname() === "/accounting/voucherRegistration",
          },
          {
            title: "Hovedbok",
            url: "http://localhost:3000/accounting/voucherRegistry",
            isActive: usePathname() === "/accounting/voucherRegistry",
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
