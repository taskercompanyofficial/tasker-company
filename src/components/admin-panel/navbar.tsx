import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { MdChangeCircle } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import revalidate from "../revalidate";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { User } from "@/types";
import { SidebarTrigger } from "../ui/sidebar";
import { useRef } from "react";

export default async function Navbar({ user }: { user: User | null }) {
  const spin = useRef(false);
  const handleSpin = () => {
    spin.current = !spin.current;
  };
  return (
    <header className="w-full border-b bg-white dark:bg-gray-800">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-4">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="mx-1 mt-1 p-1">
            <form action={revalidate}>
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <button type="submit" onClick={handleSpin}>
                      <MdChangeCircle
                        className={`h-6 w-6 ${spin.current ? "animate-spin" : ""}`}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Revalidate Dashboard
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          </div>
          <div className="relative ml-auto hidden flex-1 md:block md:grow-0">
            <Search className="absolute left-2.5 top-[15px] h-4 w-4 text-muted-foreground" />
            {/* <Notification user={user}/> */}
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}
