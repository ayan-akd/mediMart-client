import {
  SquarePen,
  LayoutGrid,
  LucideIcon,
  LayoutList,
  MailOpen
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/admin/manage-medicines",
          label: "Manage Medicines",
          icon: SquarePen,
        },
        {
          href: "/dashboard/admin/manage-orders",
          label: "Manage Orders",
          icon: LayoutList,
        },
        {
          href: "/dashboard/admin/manage-users",
          label: "Manage Users",
          icon: MailOpen,
        },
        {
          href: "/dashboard/admin/manage-payments",
          label: "Manage Payments",
          icon: MailOpen,
        },
        {
          href: "/dashboard/user/orders",
          label: "Order History",
          icon: MailOpen,
        }
      ]
    },
  ];
}
