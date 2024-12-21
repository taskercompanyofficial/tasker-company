"use client";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import Image from "next/image";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import Marquee from "react-fast-marquee";
import { getImageUrl } from "@/lib/utils";
interface BrandsType {
  id: string;
  name: string;
  slug: string;
  image: string;
}
export default function Authroizedbrands() {
  const { data, error, isLoading } = useFetch<BrandsType[]>(
    API_URL + "/fetch-authorized-brands",
  );
  return (
    <div className="overflow-hidden border-t pt-8">
      <p className="mb-4 text-sm text-muted-foreground">
        Authorized Service Providers for the following brands
      </p>
      <div className="flex rounded bg-gray-50 p-4">
        <div className="flex items-center justify-center">
          <h2 className="text-center font-mono text-lg font-bold">Brands</h2>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Marquee pauseOnHover speed={20}>
            {isLoading
              ? // Display skeleton loaders while data is loading
                Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} className="mr-4 h-16 w-16" />
                ))
              : // Display brand images when data is available
                data?.map((brand, index) => (
                  <div
                    key={index}
                    className="relative mr-4 h-16 w-16 transition-all"
                  >
                    <Image
                      src={getImageUrl(brand.image)}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
