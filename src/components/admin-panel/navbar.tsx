import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { getUserDetails } from "@/lib/getUserDetails";
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
export default async function Navbar({ user }: { user: User | null }) {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-4">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu role={user?.role} />
          <h1 className="font-bold"></h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="mx-1 mt-1 p-1">
            <form action={revalidate}>
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <button type="submit">
                      <MdChangeCircle className="h-6 w-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Revalidate Dashboard
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          </div>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
