"use client";
import React, { FormEventHandler } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { LOGIN_CHECK_URL } from "@/lib/apiEndPoints";
import Link from "next/link";
import { toast } from "sonner";
import redirectPath from "@/action/redirect";
import useForm from "@/hooks/use-fom";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { buttonVariants } from "@/components/ui/button";
import SubmitBtn from "@/components/ui/submit-button";
import { signIn } from "next-auth/react";
export default function Form() {
  const { data, setData, processing, errors, post, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(LOGIN_CHECK_URL, {
      onSuccess: (response) => {
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.status === "verification-error") {
          redirectPath("/verify-email");
        }
      },
      onFinish: () => reset("password"),
    });
  };
  return (
    <form className="my-8" onSubmit={submit}>
      <LabelInputContainer
        type="email"
        id="email"
        name="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        placeholder="example@gmail.com"
        label="Email:"
        required
        errorMessage={errors.email}
        autoComplete="email"
      />
      <LabelInputContainer
        type="password"
        id="password"
        name="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="********"
        errorMessage={errors.password}
        required
        label="Passowrd:"
        autoComplete="password"
      />
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={data.remember}
            onCheckedChange={() =>
              setData({ ...data, remember: !data.remember })
            }
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Link
          href="forgot"
          className={`${buttonVariants({
            variant: "link",
            effect: "hoverUnderline",
          })}`}
        >
          Forgot password
        </Link>
      </div>
      <SubmitBtn
        label="Sign in to your account"
        processing={processing}
        className="w-full"
        effect="shine"
      />
    </form>
  );
}
