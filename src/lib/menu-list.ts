import {
  MdHome,
  MdSupervisedUserCircle,
  MdOutlineSettings,
} from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { IoColorFilterSharp } from "react-icons/io5";
import { ClipboardList, Layers, MapPin } from "lucide-react";
type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(
  pathname: string,
  role: string | undefined,
): Group[] {
  let menuItems: Group[] = [
    {
      groupLabel: "",
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
        {
          href: "/filters",
          label: "Reports",
          active: pathname.includes("/filters"),

          icon: IoColorFilterSharp,
          submenus: [
            {
              href: "/filters/clicks",
              label: "Clicks",
              active: pathname === "clicks",
            },
            {
              href: "/filters/conversions",
              label: "Conversions",
              active: pathname === "/conversions",
            },
            {
              href: "/filters/offers-report",
              label: "Offer report",
              active: pathname === "/offers-report",
            },
            {
              href: "/filters/user-report",
              label: "User report",
              active: pathname === "/user-report",
            },
          ],
        },
      ],
    },
  ];

  if (role !== "user") {
    menuItems[0].menus.push({
      href: "/users",
      label: "Users",
      active: pathname.includes("/users"),
      icon: MdSupervisedUserCircle,
      submenus: [],
    });
  }

  if (role === "admin" || role === "administrator") {
    menuItems[0].menus.push(
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
