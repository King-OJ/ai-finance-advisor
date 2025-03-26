// components/dashboard/DashboardHeader.jsx
"use client";

import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "./Notification";
import { User } from "@/utils/types/user";

export default function HomeHeader({ user }: { user: User }) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your monthly financial report is ready", isRead: false },
    {
      id: 2,
      message: "You are close to reaching your savings goal!",
      isRead: false,
    },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <SidebarTrigger className="h-10 w-10" />
        <h2 className="font-bold text-2xl ">Welcome {user?.name} &#128075;</h2>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-4 ml-auto">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary hover:text-white [&_svg]:size-5"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-muted rounded-md shadow-lg z-10 border">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <Notification
                          key={notification.id}
                          notification={notification}
                          markAsRead={markAsRead}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-2 border-t text-center">
                    <button
                      className="text-sm text-secondary-foreground hover:text-white"
                      onClick={() =>
                        setNotifications(
                          notifications.map((n) => ({ ...n, isRead: true }))
                        )
                      }
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="relative max-w-md w-full hidden md:block h-10">
          <input
            type="text"
            placeholder="Search..."
            className="pr-10 pl-3 bg-muted py-2 w-full rounded-md focus:outline-none "
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
    </header>
  );
}
