import Navbar from "@/components/admin-panel/navbar";
import { User } from "@/types";

interface ContentLayoutProps {
  children: React.ReactNode;
  user: User | null;
}

export function ContentLayout({ children, user }: ContentLayoutProps) {
  return (
    <div>
      <Navbar user={user} />
      <div className="min-h-screen w-full px-4 py-4">{children}</div>
    </div>
  );
}
