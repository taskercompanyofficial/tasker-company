"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LoginLayoutComponent from "@/app/Layouts/layout";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An error occurred during authentication";

  // Map error codes to user-friendly messages
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid email or password. Please try again.";
  }

  return (
    <LoginLayoutComponent
      title="Authentication Error"
      description="There was a problem signing you in"
      social={false}
      socialText=""
    >
      <div className="mx-auto max-w-md w-full rounded-lg shadow-lg bg-white dark:bg-neutral-800 p-6 md:p-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Authentication Error
          </h2>
          
          <p className="text-center text-neutral-600 dark:text-neutral-300 max-w-sm">
            {errorMessage}
          </p>

          <Link
            href="/login"
            className={buttonVariants({
              variant: "default",
              className: "w-full justify-center py-2 transition-all hover:scale-105",
            })}
          >
            Back to Login
          </Link>
        </div>
      </div>
    </LoginLayoutComponent>
  );
}
