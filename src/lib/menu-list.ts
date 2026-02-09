import {
  SquarePen,
  LayoutGrid,
  LucideIcon,
  LayoutList,
  UserPenIcon,
  DollarSignIcon,
  HistoryIcon,
  User,
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

export function getMenuList(role: string): Group[] {
  const commonMenus = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: User,
          submenus: [],
        },
      ],
    },
  ];

  const adminMenus = [
    {
      groupLabel: "Admin Controls",
      menus: [
        {
          href: "/dashboard/admin/overview",
          label: "Overview",
          icon: LayoutGrid,
        },
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
          icon: UserPenIcon,
        },
        {
          href: "/dashboard/admin/manage-payments",
          label: "Manage Payments",
          icon: DollarSignIcon,
        },
      ],
    },
  ];

  const userMenus = [
    {
      groupLabel: "User Controls",
      menus: [
        {
          href: "/dashboard/user/overview",
          label: "Overview",
          icon: LayoutGrid,
        },
        {
          href: "/dashboard/user/orders",
          label: "Order History",
          icon: HistoryIcon,
        },
      ],
    },
  ];

  return role === "admin"
    ? [...commonMenus, ...adminMenus]
    : [...commonMenus, ...userMenus];
}
