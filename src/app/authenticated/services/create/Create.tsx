import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

export default function Create() {
  return (
    <Link
      href="/services/create"
      className={`flex w-full items-center gap-1 sm:w-fit ${buttonVariants({
        variant: "outline",
        size: "sm",
      })}`}
    >
      <FaPlus />
      Add New Service
    </Link>
  );
}
