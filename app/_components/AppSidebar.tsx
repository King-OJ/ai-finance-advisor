"use client";
import React from "react";
import {
  LayoutGrid,
  CircleDollarSign,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
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
import DemoModeToggle from "./DemoModeToggle";

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
      title: "Income",
      url: "/income",
      icon: CircleDollarSign,
    },
    {
      title: "Budgets",
      url: "/budgets",
      icon: PiggyBank,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ReceiptText,
    },
    {
      title: "Upgrade",
      url: "/upgrade",
      icon: ShieldCheck,
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
                  className="hover:bg-primary/60 gap-4"
                >
                  <Link href={item.url}>
                    <item.icon
                      className={`w-auto h-auto ${
                        pathname.includes(item.url)
                          ? "text-white"
                          : "text-primary"
                      }`}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <DemoModeToggle onToggle={() => {}} />
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
