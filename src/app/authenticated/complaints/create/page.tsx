import React from "react";
import Form from "./form";
import { complaintsCreateMeta } from "@/lib/Meta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${complaintsCreateMeta.title} | Tasker Company`,
  description: complaintsCreateMeta.description,
};

export default async function page() {
  return (
    <div>
      <Form />
    </div>
  );
}
