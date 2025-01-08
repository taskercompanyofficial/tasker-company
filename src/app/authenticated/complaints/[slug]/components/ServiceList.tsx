"use client";
import { getImageUrl } from "@/lib/utils";
import { CategoriesType, ServicesType } from "@/types";
import Image from "next/image";
import React from "react";
import { Star } from "lucide-react"; // Example icon library

export default function ServiceList() {
  const services = [
    {
      name: "Personal Training",
      description:
        "One-on-one personal training sessions tailored to your goals.",
      image: "path/to/service1.jpg",
      rating: 4.8,
      price: 50,
    },
    {
      name: "Nutrition Counseling",
      description: "Customized nutrition plans for a healthier lifestyle.",
      image: "path/to/service2.jpg",
      rating: 4.5,
      price: 30,
    },
    {
      name: "Yoga Classes",
      description: "Relax and rejuvenate with our expert-led yoga sessions.",
      image: "path/to/service3.jpg",
      rating: 4.7,
      price: 20,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-slate-950"
        >
          {/* Service Image */}
          <div className="relative h-[180px] w-full">
            <Image
              src={getImageUrl(service.image)}
              alt={service.name || "Service Image"}
              loading="lazy"
              fill
              className="object-cover"
            />
            <div className="absolute right-2 top-2 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-white">
              {service.rating.toFixed(1)} ★
            </div>
          </div>

          {/* Card Content */}
          <div className="space-y-3 p-4">
            {/* Service Name */}
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
              {service.name}
            </h3>

            {/* Service Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {service.description.length > 70
                ? `${service.description.slice(0, 70)}...`
                : service.description}
            </p>

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  ${service.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {" "}
                  / session
                </span>
              </div>
              <button className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
