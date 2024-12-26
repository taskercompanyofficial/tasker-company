import React from "react";
import { usersCreateMeta } from "@/lib/Meta";
import { Metadata } from "next";
import Form from "../components/form";
export const metadata: Metadata = {
  title: `${usersCreateMeta.title} | Tasker Company`,
  description: usersCreateMeta.description,
};
export default function page() {
  return (
    <>
      <div className="mb-2">
        <h2 className="font-serif text-lg font-semibold">
          {usersCreateMeta.title}
        </h2>
        <p className="hidden font-serif text-sm text-gray-500 sm:block">
          {usersCreateMeta.description}
        </p>
      </div>
      <Form />
    </>
  );
}
