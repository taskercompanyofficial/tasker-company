import React from "react";
import { servicesCreateMeta } from "@/lib/Meta";
import { Metadata } from "next";
import Form from "../components/form";
export const metadata: Metadata = {
  title: `${servicesCreateMeta.title} | Tasker Company`,
  description: servicesCreateMeta.description,
};
export default function page() {
  return (
    <>
      <div className="mb-2">
        <h2 className="font-serif text-lg font-semibold">
          {servicesCreateMeta.title}
        </h2>
        <p className="hidden font-serif text-sm text-gray-500 sm:block">
          {servicesCreateMeta.description}
        </p>
      </div>
      <Form />
    </>
  );
}
