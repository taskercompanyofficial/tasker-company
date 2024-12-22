import { MdHome, MdOutlineSettings } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import {
  Briefcase,
  ClipboardList,
  Handshake,
  Layers,
  MapPin,
  User,
} from "lucide-react";
type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(
  pathname: string,
  role: string | undefined,
): Group[] {
  let menuItems: Group[] = [
    {
      groupLabel: "Platform",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: MdHome,
          submenus: [],
        },
        {
          href: "/market-place",
          label: "Market Place",
          active: pathname === "/market-place",
          icon: AiFillProduct,
          submenus: [],
        },
        {
          href: "/complaints",
          label: "Complaints",
          active: pathname.includes("/complaints"),
          icon: ClipboardList,
          submenus: [],
        },
      ],
    },
  ];

  if (role === "admin" || role === "administrator") {
    menuItems[0].menus.push(
      {
        href: "/users",
        label: "Users",
        active: pathname === "/users",
        icon: User,
        submenus: [],
      },
      {
        href: "#",
        label: "All Services",
        active:
          pathname === "/services" ||
          pathname === "/categories" ||
          pathname === "/sub-services",
        icon: Layers,
        submenus: [
          {
            href: "/sub-services",
            label: "Sub Services",
            active: pathname === "/sub-services",
          },
          {
            href: "/services",
            label: "Services",
            active: pathname === "/services",
          },
          {
            href: "/categories",
            label: "Categories",
            active: pathname === "/categories",
          },
        ],
      },
      {
        href: "/branches",
        label: "Branches",
        active: pathname === "/branches",
        icon: MapPin,
        submenus: [],
      },
      {
        href: "/authorized-brands",
        label: "Authorized Brands",
        active: pathname === "/authorized-brands",
        icon: Handshake,
        submenus: [],
      },
      {
        href: "/our-projects",
        label: "Our Projects",
        active: pathname === "/our-projects",
        icon: Briefcase,
        submenus: [],
      },
    );
  }

  menuItems.push({
    groupLabel: "Settings",
    menus: [
      {
        href: "/account",
        label: "Account",
        active: pathname === "/account",
        icon: MdOutlineSettings,
        submenus: [],
      },
    ],
  });

  return menuItems;
}
