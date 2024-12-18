import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { signupMeta } from "@/lib/Meta";
import { Metadata } from "next";
import Form from "./form";
import LoginLayoutComponent from "@/app/Layouts/layout";
export const metadata: Metadata = signupMeta;

export default function Register() {
  return (
    <LoginLayoutComponent
      title={signupMeta.title}
      description={signupMeta.description}
      social={true}
      socialText="or signup using"
    >
      <div className="mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4">
        <div className="">
          <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to Freelancing Network!
          </h2>
          <span className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Sign up now to connect with clients and grow your freelancing
            career. or?
          </span>
          <div className="absolute right-3 top-0">
            <Link
              href="/login"
              className={`${buttonVariants({
                variant: "secondary",
              })}`}
            >
              Login
            </Link>
          </div>
        </div>
        <div className="my-4 w-full">
          <Form />
        </div>
      </div>
    </LoginLayoutComponent>
  );
}
