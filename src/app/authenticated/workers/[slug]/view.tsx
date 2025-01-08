"use client";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ServiceList from "./components/ServiceList";
import { ServicesType } from "@/types";

export default function View({ data }: { data: ServicesType }) {
  const keywordsArray = data.keywords.split(",");
  return (
    <div className="h-full py-6">
      {/* Image Wrapper */}
      <div className="relative h-[250px] w-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-md dark:bg-slate-950 sm:h-[300px]">
        <Image
          src={getImageUrl(data.hero_image)}
          alt={data.name || "Category Image"}
          loading="lazy"
          fill
          className="rounded-md object-cover"
        />
      </div>

      <motion.div
        initial={{ marginTop: "-10rem" }}
        animate={{ marginTop: "-5rem" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col gap-6 rounded-lg bg-white p-6 shadow-lg dark:bg-slate-950 sm:flex-row"
      >
        {/* Profile Image */}
        <div className="relative mx-auto h-[150px] w-[150px] overflow-hidden rounded-full border-4 border-white shadow-lg sm:mx-0 sm:h-[200px] sm:w-[200px]">
          <Image
            src={getImageUrl(data.image)}
            alt={data.name || "Category Image"}
            loading="lazy"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 pt-2">
          <h2 className="text-center font-serif text-xl font-semibold uppercase text-gray-900 dark:text-gray-100 sm:text-left">
            {data.name}
          </h2>
          <em className="block text-center font-serif text-sm text-gray-500 dark:text-gray-400 sm:text-left">
            <Label className="font-bold">Description:</Label> {data.description}
          </em>

          {/* Keywords */}
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <Label className="font-bold">Keywords:</Label>
            {keywordsArray.map((keyword, index) => (
              <Badge key={index}>{keyword.trim()}</Badge>
            ))}
          </div>
        </div>
      </motion.div>
      <ServiceList />
    </div>
  );
}
