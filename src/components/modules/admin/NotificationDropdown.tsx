"use client";
import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  markAllAsRead,
  notificationsSelector,
  unreadCountSelector,
} from "@/redux/features/notificationSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export function NotificationDropdown() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(notificationsSelector);
  const unreadCount = useAppSelector(unreadCountSelector);
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="h-5 w-5 cursor-pointer" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <div className="flex justify-between items-center px-4 py-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>
            <p className="text-gray-500">No notifications</p>
          </DropdownMenuItem>
        ) : (
          notifications.map((notification, index) => (
            <DropdownMenuItem key={index} className="flex flex-col">
              <p className="text-sm w-full">{notification.message}</p>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
