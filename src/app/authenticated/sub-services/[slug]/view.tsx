"use client";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ServicesType, SubServicesType } from "@/types";

export default function View({ data }: { data: SubServicesType }) {
  const keywordsArray = data.keywords.split(",");
  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-slate-900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12 h-[400px] w-full overflow-hidden rounded-2xl">
          <Image
            src={getImageUrl(data.hero_image)}
            alt={data.name || "Service Hero Image"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="mb-2 font-serif text-4xl font-bold text-white">
              {data.name}
            </h1>
            <p className="max-w-2xl text-lg text-gray-200">
              {data.description}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Service Info Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                  <Image
                    src={getImageUrl(data.image)}
                    alt={data.name || "Service Icon"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-gray-900 dark:text-white">
                    {data.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {data.category_name}
                  </p>
                </div>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  {data.description}
                </p>
              </div>

              <div className="mt-6">
                <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Service Keywords
                </Label>
                <div className="flex flex-wrap gap-2">
                  {keywordsArray.map((keyword, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
