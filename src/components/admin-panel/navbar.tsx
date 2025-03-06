"use client";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { ToggleButton } from "../ui/ToggleButton";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { fetchLowStockMedicines, notificationsSelector } from "@/redux/features/notificationSlice";
import { NotificationDropdown } from "../modules/admin/NotificationDropdown";
import { useUser } from "@/context/UserContext";


interface NavbarProps {
  title: string;
}

export function DashboardNavbar({ title }: NavbarProps) {
  const {user} = useUser();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(notificationsSelector)
  useEffect(() => {
    if (notifications.length === 0) {
      dispatch(fetchLowStockMedicines());
    }
  }, [dispatch, notifications.length]);
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center gap-4 justify-end">
          {
            user && user.role === "admin" && <NotificationDropdown />
          }
          <ToggleButton />
        </div>
      </div>
    </header>
  );
}
