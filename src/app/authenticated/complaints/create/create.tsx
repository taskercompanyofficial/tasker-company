import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

export default function CreateComplaint() {
  return (
    <Link
      href="/authenticated/complaints/create"
      className={`flex h-8 w-full items-center gap-1 sm:w-fit ${buttonVariants({
        variant: "default",
        size: "sm",
      })}`}
    >
      <FaPlus />
      Add New Complaint
    </Link>
  );
}
