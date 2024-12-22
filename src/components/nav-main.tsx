"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Group } from "@/lib/menu-list";
import Link from "next/link";

export function NavMain({ items }: { items: Group[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{items[0].groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((group) => (
          <SidebarMenu key={group.groupLabel}>
            {group.menus.map((menu) => (
              <Collapsible
                key={menu.label}
                asChild
                defaultOpen={
                  menu.active || menu.submenus.some((submenu) => submenu.active)
                }
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={menu.label}
                    isActive={menu.active}
                  >
                    {!menu.active ? (
                      <Link href={menu.href}>
                        <menu.icon />
                        <span>{menu.label}</span>
                      </Link>
                    ) : (
                      <span className="cursor-not-allowed">
                        <menu.icon />
                        <span>{menu.label}</span>
                      </span>
                    )}
                  </SidebarMenuButton>
                  {menu.submenus.length > 0 ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {menu.submenus.map((submenu) => (
                            <SidebarMenuSubItem key={submenu.label}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={submenu.active}
                              >
                                <Link href={submenu.href}>
                                  <span>{submenu.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
