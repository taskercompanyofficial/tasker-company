import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";

export default function UpdateCategory({ slug }: { slug: string }) {
  return (
    <>
      <Link
        href={`/categories/${slug}`}
        target="_blank"
        className={`m-0 w-full space-x-4 py-1 ${buttonVariants({
          variant: "ghost",
          size: "sm",
        })}`}
      >
        View
        <Eye />
      </Link>
      <Link
        href={`/categories/edit/${slug}`}
        target="_blank"
        className={`m-0 w-full py-1 ${buttonVariants({
          variant: "ghost",
          size: "sm",
        })}`}
      >
        <Edit />
        Update
      </Link>
    </>
  );
}
