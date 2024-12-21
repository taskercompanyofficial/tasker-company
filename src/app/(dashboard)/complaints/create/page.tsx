import React from "react";
import { complaintsCreateMeta } from "@/lib/Meta";
import { Metadata } from "next";
import Form from "../components/form";
export const metadata: Metadata = {
  title: `${complaintsCreateMeta.title} | Tasker Company`,
  description: complaintsCreateMeta.description,
};
export default function page() {
  return (
    <>
      <div className="mb-2">
        <h2 className="font-serif text-lg font-semibold">
          {complaintsCreateMeta.title}
        </h2>
        <p className="hidden font-serif text-sm text-gray-500 sm:block">
          {complaintsCreateMeta.description}
        </p>
      </div>
      <Form />
    </>
  );
}
