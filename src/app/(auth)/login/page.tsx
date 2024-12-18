import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Form from "./form";
import { Metadata } from "next";
import LoginLayoutComponent from "@/app/Layouts/layout";
import { loginMeta } from "@/lib/Meta";
export const metadata: Metadata = loginMeta;
export default function Login() {
  return (
    <LoginLayoutComponent
      title={loginMeta.title}
      description={loginMeta.description}
      social={true}
      socialText="or signin using"
    >
      <div className="mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4">
        <div className="">
          <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
            Welcome back to Logic Pulse!
          </h2>
          <span className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Login to Logic Pulse to elevate your affiliate marketing strategies,
            access in-depth analytics, and drive more traffic. Need an account?{" "}
            <div className="absolute right-3 top-0">
              <Link
                href="signup"
                className={`${buttonVariants({
                  variant: "secondary",
                })}`}
              >
                Signup
              </Link>
            </div>
          </span>
        </div>
        <Form />
      </div>
    </LoginLayoutComponent>
  );
}
