import { Metadata } from "next";
import { getUserDetails } from "@/lib/getUserDetails";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Dashboard | LogicPulse",
  description: "An Evesome platform",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserDetails();
  const role = user.userDetails?.role || "user";
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <main className="min-h-screen bg-gray-50 p-4">{children}</main>
        <footer className="mt-8 border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
                <p className="text-base text-gray-500">Tasker Company</p>
                <p className="text-sm text-gray-500">
                  Empowering productivity through intelligent task management.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Product
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="/features"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pricing"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/integrations"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Integrations
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Support
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="/help"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/api"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          API Documentation
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Company
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="/about"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/careers"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Careers
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Legal
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="/privacy"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Privacy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/terms"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Terms
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8">
              <p className="text-base text-gray-400 xl:text-center">
                &copy; {new Date().getFullYear()} Tasker Company. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
