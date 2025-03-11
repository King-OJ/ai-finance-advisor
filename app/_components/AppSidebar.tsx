"use client";
import React from "react";
import { LayoutGrid, Lightbulb, List, Trophy, LineChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AppLogoAndTitle from "./AppLogoAndTitle";
import UserInfoAndLogoutBtn from "./UserInfoAndLogoutBtn";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function AppSidebar() {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      title: "Portfolio",
      url: "/portfolio",
      icon: LineChart,
    },
    {
      title: "AI Advisor",
      url: "/ai_advisor",
      icon: Lightbulb,
    },
    {
      title: "Goals",
      url: "/goals",
      icon: Trophy,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: List,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <AppLogoAndTitle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  size={"lg"}
                  isActive={pathname.includes(item.url)}
                  className="hover:bg-primary/60"
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter>
        <UserInfoAndLogoutBtn session={session} status={status} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
