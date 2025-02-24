"use client";
import React from "react";
import {
  Briefcase,
  LayoutGrid,
  User,
  MessageSquareMore,
  Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AppLogoAndTitle from "./AppLogoAndTitle";
import UserInfoAndLogoutBtn from "./UserInfoAndLogoutBtn";

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
      icon: Briefcase,
    },
    {
      title: "AI Advisor",
      url: "/ai_advisor",
      icon: MessageSquareMore,
    },
    {
      title: "Assets",
      url: "/assets",
      icon: Package,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ];

  return (
    <aside className="w-full bg-muted h-full py-10 px-6 flex flex-col justify-between">
      <div>
        <div className="mb-20">
          <AppLogoAndTitle />
        </div>
        <ul className="space-y-6">
          {items.map((item) => {
            return (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className={`flex items-center py-2 w-full ${
                    pathname.includes(item.url)
                      ? "bg-primary font-semibold"
                      : "font-medium"
                  } px-4 rounded-lg text-base `}
                >
                  <item.icon size={20} />
                  <span className="ml-2">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <UserInfoAndLogoutBtn session={session} status={status} />
    </aside>
  );
}

export default AppSidebar;
