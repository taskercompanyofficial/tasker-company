"use client";

import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section className="bg-gradient-to-t from-yellow-100 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-yellow-800">
            Our Vision & Mission
          </h2>
          <p className="mx-auto max-w-3xl text-yellow-700">
            At Tasker Company, we are driven by a clear vision and mission to
            provide exceptional HVAC services and solutions.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="transform rounded-lg bg-white p-8 shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <h3 className="mb-4 text-2xl font-bold text-yellow-600">Vision</h3>
            <p className="text-yellow-800">
              To be the leading HVAC service provider, recognized for our
              commitment to excellence, innovation, and customer satisfaction.
              We aim to create comfortable and energy-efficient environments
              that enhance the quality of life for our clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="transform rounded-lg bg-white p-8 shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <h3 className="mb-4 text-2xl font-bold text-yellow-600">Mission</h3>
            <p className="text-yellow-800">
              Our mission is to deliver high-quality, energy-efficient HVAC
              solutions tailored to each client unique needs. We are committed
              to:
            </p>
            <ul className="mt-4 list-inside list-disc text-yellow-700">
              <li>Providing exceptional customer service</li>
              <li>Employing cutting-edge technology and best practices</li>
              <li>Continuously improving our skills and knowledge</li>
              <li>Promoting environmental responsibility</li>
              <li>
                Building long-lasting relationships with our clients and
                partners
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
