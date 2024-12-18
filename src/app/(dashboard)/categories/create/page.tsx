import React from "react";
import { categoriesCreateMeta } from "@/lib/Meta";
import { Metadata } from "next";
import Form from "../components/form";
export const metadata: Metadata = {
  title: `${categoriesCreateMeta.title} | Tasker Company`,
  description: categoriesCreateMeta.description,
};
export default function page() {
  return (
    <>
      <div className="mb-2">
        <h2 className="font-serif text-lg font-semibold">
          {categoriesCreateMeta.title}
        </h2>
        <p className="hidden font-serif text-sm text-gray-500 sm:block">
          {categoriesCreateMeta.description}
        </p>
      </div>
      <Form />
    </>
  );
}
