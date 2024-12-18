"use client";
import React, { FormEventHandler } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import useForm from "@/hooks/use-fom";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/submit-button";
export default function Form() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(REGISTER_URL, {
      onSuccess: (response) => {
        toast.success(response.message);
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onFinish: () => reset("password", "password_confirmation"),
    });
  };
  return (
    <form onSubmit={submit} className="space-y-2">
      <LabelInputContainer
        type="text"
        id="name"
        placeholder="eg: John Smith"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        required
        errorMessage={errors.name}
        autoFocus
        label="Full Name"
      />
      <LabelInputContainer
        type="email"
        id="email"
        placeholder="example@domain.com"
        value={data.email}
        onChange={(e) => setData("email", e.target.value)}
        required
        errorMessage={errors.email}
        autoFocus
        label="Email"
      />
      <div className="grid grid-cols-2 gap-2">
        <LabelInputContainer
          id="password"
          type="password"
          label="Password"
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          required
        />
        <LabelInputContainer
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={data.password_confirmation}
          onChange={(e) => setData("password_confirmation", e.target.value)}
          required
        />
      </div>
      <div className="items-top mb-1 mt-2 flex space-x-2">
        <Checkbox id="terms1" required />
        <div className="grid gap-1 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <SubmitBtn
          label="Create new account"
          processing={processing}
          className="w-full"
          effect="shine"
        />
      </div>
    </form>
  );
}
