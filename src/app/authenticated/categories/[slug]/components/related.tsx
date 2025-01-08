"use client";
import { getImageUrl } from "@/lib/utils";
import { CategoriesType } from "@/types";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";

export default function CardList({ data }: { data: CategoriesType[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-slate-950"
        >
          {/* Card Image */}
          <div className="relative h-[150px] w-full">
            <Image
              src={getImageUrl(item.hero_image)}
              alt={item.name || "Category Image"}
              loading="lazy"
              fill
              className="object-cover"
            />
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
              {item.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {item.description.length > 60
                ? `${item.description.slice(0, 60)}...`
                : item.description}
            </p>

            {/* Keywords */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {item.keywords
                .split(",")
                .slice(0, 3) // Limit the display to 3 keywords
                .map((keyword, i) => (
                  <Badge key={i}>{keyword.trim()}</Badge>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
