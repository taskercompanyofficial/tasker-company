import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dark from "@/components/ui/Dark";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import BackToTop from "@/components/base/BackToTop";
import { description, keywords, title } from "@/lib/Meta";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
  openGraph: {
    title: "Tasker Company - Comprehensive Services for Your Needs",
    description:
      "Tasker Company offers a wide range of services, including hiring skilled technicians, expert electricians, and professionals in any field of your life. Discover seamless solutions tailored to your needs",
    url: "https://taskercompany.com", // Replace with the actual URL
    siteName: "Tasker Company",
    images: [
      {
        url: "https://taskercompany.com/assets/images/og-image.webp", // Replace with the actual OG image URL
        width: 1200,
        height: 630,
        alt: "Tasker Company - Comprehensive Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@taskercompany", // Replace with your Twitter handle
    title: "Tasker Company - Comprehensive Services for Your Needs",
    description:
      "Tasker Company offers a wide range of services, including hiring skilled technicians, expert electricians, and professionals in any field of your life. Discover seamless solutions tailored to your needs",
    images: ["https://taskercompany.com/assets/images/og-image.webp"], // Replace with the actual Twitter image URL
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950`}>
        <NextTopLoader
          showSpinner={false}
          height={4}
          color="hsl(var(--primary))"
        />

        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Dark />
          </ThemeProvider>
        </AuthProvider>
        <BackToTop />
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
