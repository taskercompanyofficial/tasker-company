import Link from "next/link";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { MdLensBlur } from "react-icons/md";

export function Sidebar({ role }: { role: string | undefined }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 h-screen -translate-x-full border-r bg-white transition-[width] duration-300 ease-in-out dark:bg-gray-900 lg:translate-x-0",
          sidebar?.isOpen === false ? "w-[50px]" : "w-60",
        )}
      >
        <SidebarToggle
          isOpen={sidebar?.isOpen}
          setIsOpen={sidebar?.setIsOpen}
        />
        <div className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden py-4">
          <Button
            className={cn(
              "mb-1 transition-transform duration-300 ease-in-out",
              sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
            )}
            variant="link"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <MdLensBlur className="mr-1 h-6 w-6" />
              <h1
                className={cn(
                  "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                  sidebar?.isOpen === false
                    ? "hidden -translate-x-96 opacity-0"
                    : "translate-x-0 opacity-100",
                )}
              >
                Tasker Company
              </h1>
            </Link>
          </Button>
          <Menu isOpen={sidebar?.isOpen} role={role} />
        </div>
      </aside>

      <div className="fixed bottom-0 left-0 right-0 gap-2">Hello</div>
    </>
  );
}
