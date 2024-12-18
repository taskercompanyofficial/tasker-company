"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Typewriter from "typewriter-effect";
import "swiper/css/navigation";
import Marquee from "react-fast-marquee";

const heroSlides = [
  {
    image: "/assets/images/home/hero-1.svg",
    title: "Expert HVAC Solutions",
    description: "Providing top-notch heating and cooling services",
  },
  {
    image: "/assets/images/home/hero-2.svg",
    title: "Energy-Efficient Systems",
    description: "Helping you save on energy costs",
  },
  {
    image: "/assets/images/home/hero-3.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
  {
    image: "/assets/images/home/hero-4.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
  {
    image: "/assets/images/home/hero-5.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
  {
    image: "/assets/images/home/hero-6.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
  {
    image: "/assets/images/home/hero-7.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
  {
    image: "/assets/images/home/hero-8.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
  {
    image: "/assets/images/home/hero-9.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
  {
    image: "/assets/images/home/hero-10.svg",
    title: "24/7 Emergency Service",
    description: "Always here when you need us",
  },
];
const clients = [
  { path: "/assets/images/clients/aux-logo.png" },
  { path: "/assets/images/clients/pell-logo.png" },
  { path: "/assets/images/clients/mitsubishi-electric-logo.png" },
  { path: "/assets/images/clients/panasonic-logo.png" },
  { path: "/assets/images/clients/tcl-logo.png" },
  { path: "/assets/images/clients/hisense-logo.png" },
];
const changingTexts = ["Reliable", "Professional", "Efficient", "Innovative"];

export default function HeroNew() {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 pb-4 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-8 text-white md:mb-0 md:w-1/2">
            <motion.h1
              className="mb-4 text-4xl font-bold md:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tasker Company: Your{" "}
              <span className="text-yellow-300">
                <Typewriter
                  options={{
                    strings: changingTexts,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
              HVAC Partner
            </motion.h1>
            <h3 className="my-2 font-mono text-2xl font-bold">
              <em>Your Trusted Partner for Professional Services</em>
            </h3>
            <p className="text-base leading-relaxed">
              Tasker Company offers comprehensive solutions to meet all your
              service needs. With a skilled and professional team, we deliver
              reliable, high-quality services tailored to help your business
              succeed. Discover why businesses trust us for excellence and
              innovation.
            </p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-purple-800 hover:bg-yellow-500"
              >
                <Link href="#contact">Get a Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent hover:bg-background/40"
              >
                <Link href="#services">Our Services</Link>
              </Button>
            </motion.div>
          </div>
          <div className="hidden md:block md:w-1/2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {heroSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                    <h2 className="text-xl font-bold">{slide.title}</h2>
                    <p>{slide.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-background p-2 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Marquee>
          {clients.map((image) => (
            <Image
              key={image.path}
              src={image.path}
              alt=""
              width={80}
              height={20}
              className="mr-4"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
