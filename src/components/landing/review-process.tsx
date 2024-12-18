"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Clock,
  UserCheck,
  ClipboardCheck,
  Star,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Initial Contact",
    description:
      "Contact us through phone, email, or our website to describe your HVACR needs.",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description:
      "Our team responds promptly to schedule a consultation or service visit.",
  },
  {
    icon: UserCheck,
    title: "Expert Assessment",
    description:
      "Our certified technicians evaluate your requirements and provide detailed solutions.",
  },
  {
    icon: ClipboardCheck,
    title: "Service Execution",
    description:
      "We complete the service with precision, keeping you informed at every step.",
  },
  {
    icon: Star,
    title: "Follow-up",
    description:
      "We ensure your satisfaction and provide ongoing support as needed.",
  },
];

export default function ReviewProcess() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Our Service Process</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Experience our streamlined approach to HVACR services, designed to
            provide you with the best possible support.
          </p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 -z-10 hidden h-full w-1 -translate-x-1/2 transform bg-yellow-200 md:block" />
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center gap-4 md:flex-row md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <step.icon className="mx-auto mb-4 h-8 w-8 text-yellow-600 md:mx-0" />
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-300 text-white">
                  {index + 1}
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
