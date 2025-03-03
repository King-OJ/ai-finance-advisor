import React from "react";

interface NotificationProps {
  id: number;
  message: string;
  isRead: boolean;
}

function Notification({
  notification,
  markAsRead,
}: {
  notification: NotificationProps;
  markAsRead: (id: number) => void;
}) {
  return (
    <div
      className={`p-4 border-b cursor-pointer hover:bg-primary ${
        !notification.isRead ? "bg-primary/60" : ""
      }`}
      onClick={() => markAsRead(notification.id)}
    >
      <p className="text-sm">{notification.message}</p>
    </div>
  );
}

export default Notification;
