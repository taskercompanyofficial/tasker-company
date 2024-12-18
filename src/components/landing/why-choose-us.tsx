"use client";

import { motion } from "framer-motion";
import { Check, Clock, Users, DollarSign, HeartHandshake } from "lucide-react";

const reasons = [
  {
    id: "01",
    title: "Expertise You Can Trust",
    description:
      "Our team comprises certified professionals with years of experience in HVAC installation, maintenance, and repair.",
    icon: Check,
  },
  {
    id: "02",
    title: "24/7 Availability",
    description:
      "At Tasker company we gather the information from user step by step and keep you informed throughout the process.",
    icon: Clock,
  },
  {
    id: "03",
    title: "Customer-Centric Approach",
    description:
      "Our feedback team keeps the client informed every step of the way, maintaining constant communication.",
    icon: Users,
  },
  {
    id: "04",
    title: "Competitive Pricing",
    description:
      "High-quality service doesn t have to come at a high price. We offer transparent pricing with no hidden fees.",
    icon: DollarSign,
  },
  {
    id: "05",
    title: "Exceptional After-Sales Service",
    description:
      "Our commitment doesn t end with project completion. We offer comprehensive after-sales support.",
    icon: HeartHandshake,
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="bg-gradient-to-b from-yellow-100 to-white py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Why Choose Tasker Company</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Experience excellence in HVACR services with our dedicated team of
            professionals.
          </p>
        </motion.div>
        <div className="space-y-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <reason.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
