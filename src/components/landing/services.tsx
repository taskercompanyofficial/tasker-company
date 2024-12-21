"use client";
import {
  FaTools,
  FaBolt,
  FaLaptop,
  FaArrowRight,
  FaAngleRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import { CategoriesType } from "@/types";

const featureCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

type FeatureCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  index: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
  index,
}) => (
  <motion.div
    className="transform rounded-xl bg-white p-6 text-center shadow-md transition-all hover:scale-105 hover:shadow-lg"
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={featureCardVariants}
  >
    {icon}
    <h3 className="mb-2 mt-6 text-lg font-semibold">{title}</h3>
    <p className="mb-4 text-gray-600">{description}</p>
    <a
      href={linkHref}
      className="inline-block font-bold text-yellow-600 hover:underline"
      role="link"
      aria-label={`Learn more about ${title}`}
    >
      {linkText}
    </a>
  </motion.div>
);

const Services: React.FC = () => {
  const services = [
    {
      icon: (
        <FaTools className="h-12 w-12 rounded-full bg-yellow-100 p-3 text-yellow-600" />
      ),
      title: "Hire a Technician",
      description: "Find skilled technicians for any task.",
      linkText: "Discover More",
      linkHref: "#hire-a-technician",
    },
    {
      icon: (
        <FaBolt className="h-12 w-12 rounded-full bg-yellow-100 p-3 text-yellow-600" />
      ),
      title: "Hire an Electrician",
      description: "Expert electrical services at your fingertips.",
      linkText: "Explore Services",
      linkHref: "#hire-an-electrician",
    },
    {
      icon: (
        <FaLaptop className="h-12 w-12 rounded-full bg-yellow-100 p-3 text-yellow-600" />
      ),
      title: "Hire an IT Specialist",
      description: "Professional IT specialists for all your needs.",
      linkText: "See Details",
      linkHref: "#hire-an-it-specialist",
    },
    {
      icon: (
        <FaArrowRight className="h-12 w-12 rounded-full bg-yellow-100 p-3 text-yellow-600" />
      ),
      title: "See More",
      description: "Explore additional services we offer.",
      linkText: "Learn More",
      linkHref: "#see-more",
    },
  ];
  const { data, isLoading, error } = useFetch<CategoriesType>(
    API_URL + "/fetch-categories-ids",
  );

  return (
    <section className="mt-28 p-4 sm:px-10" id="services">
      <div className="mx-auto">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
              Your Reliable Partner for Comprehensive Services
            </h2>
            <p className="leading-relaxed text-gray-700">
              At Tasker Company, we offer a broad range of services to cater to
              all your needs. From hiring skilled technicians to expert
              electricians and IT specialists, we have got you covered. Discover
              our tailored solutions for a seamless experience.
            </p>
            <Link
              href="/services"
              className={`mt-4 ${buttonVariants({ variant: "default" })}`}
            >
              See All Services
              <FaAngleRight />
            </Link>
          </motion.div>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {data && (
            <motion.div
              className="grid gap-8 sm:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, delay: 0.5 },
                },
              }}
            >
              {services.map((service, idx) => (
                <FeatureCard key={idx} index={idx} {...service} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
