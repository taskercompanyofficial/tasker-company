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
          href: "/authenticated",
          label: "Dashboard",
          active: pathname === "/authenticated",
          icon: MdHome,
          submenus: [],
        },
        {
          href: "/authenticated/market-place",
          label: "Market Place",
          active: pathname === "/authenticated/market-place",
          icon: AiFillProduct,
          submenus: [],
        },
        {
          href: "/authenticated/complaints",
          label: "Complaints",
          active: pathname.includes("/authenticated//complaints"),
          icon: ClipboardList,
          submenus: [],
        },
      ],
    },
  ];

  if (role === "admin" || role === "administrator") {
    menuItems[0].menus.push(
      {
        href: "/authenticated/workers",
        label: "Workers",
        active: pathname === "/authenticated/workers",
        icon: User,
        submenus: [],
      },
      {
        href: "#",
        label: "All Services",
        active:
          pathname === "/authenticated/services" ||
          pathname === "/authenticated/categories" ||
          pathname === "/authenticated/sub-services",
        icon: Layers,
        submenus: [
          {
            href: "/authenticated/sub-services",
            label: "Sub Services",
            active: pathname === "/authenticated/sub-services",
          },
          {
            href: "/authenticated/services",
            label: "Services",
            active: pathname === "/authenticated/services",
          },
          {
            href: "/authenticated/categories",
            label: "Categories",
            active: pathname === "/authenticated/categories",
          },
        ],
      },
      {
        href: "/authenticated/branches",
        label: "Branches",
        active: pathname === "/authenticated/branches",
        icon: MapPin,
        submenus: [],
      },
      {
        href: "/authenticated/authorized-brands",
        label: "Authorized Brands",
        active: pathname === "/authenticated/authorized-brands",
        icon: Handshake,
        submenus: [],
      },
      {
        href: "/authenticated/our-projects",
        label: "Our Projects",
        active: pathname === "/authenticated/our-projects",
        icon: Briefcase,
        submenus: [],
      },
    );
  }

  menuItems.push({
    groupLabel: "Settings",
    menus: [
      {
        href: "/authenticated/account",
        label: "Account",
        active: pathname === "/authenticated/account",
        icon: MdOutlineSettings,
        submenus: [],
      },
    ],
  });

  return menuItems;
}
