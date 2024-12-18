"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { buttonVariants } from "../ui/button";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white bg-gradient-to-b from-yellow-100 to-white py-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse items-center md:flex-row">
          <motion.div
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              About Tasker Company
            </h2>
            <p className="mb-4 text-gray-600">
              Since 2016, Tasker Company has been a premier provider of Heating,
              Ventilation, Air Conditioning, and Refrigeration (HVACR)
              solutions. We focus on the supply, installation, and maintenance
              of systems for residential, commercial, and industrial sectors.
            </p>
            <p className="mb-4 text-gray-600">
              Our experienced team of engineers and technicians, equipped with
              advanced tools and extensive industry knowledge, ensures that each
              project is executed with precision, upholding the highest safety
              and engineering standards.
            </p>
            <ul className="mb-4 list-inside list-disc text-gray-600">
              <li>24/7 availability for emergency services</li>
              <li>Experienced and certified professionals</li>
              <li>Energy-efficient and cost-effective solutions</li>
              <li>Comprehensive after-sales support</li>
            </ul>
            <a
              href="#contact"
              className={`rounded-full ${buttonVariants({ effect: "gooeyLeft" })}`}
            >
              Contact Us
            </a>
          </motion.div>
          <motion.div
            className="mb-8 md:mb-0 md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="\assets\images\undraw_windy_day_x-63-l.svg"
              alt="About Tasker Company"
              width={600}
              height={400}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
