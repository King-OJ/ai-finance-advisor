"use client";
import React from "react";
import {
  Briefcase,
  LayoutGrid,
  User,
  MessageSquareMore,
  Package,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AppLogoAndTitle from "./AppLogoAndTitle";
import profilePicPlaceholder from "@/public/profile_picture_placeholder.png";

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
      title: "Chat AI",
      url: "/chatai",
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

      {session?.user && (
        <button className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-3">
            {session?.user && (
              <div className="h-10 w-10 bg-secondary rounded-full">
                <Image
                  alt={"user image"}
                  src={session.user.image || profilePicPlaceholder}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-2">
              <h5 className="font-bold">{session?.user.name}</h5>
            </div>
          </div>

          <ChevronDown />
        </button>
      )}
    </aside>
  );
}

export default AppSidebar;
