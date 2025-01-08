"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-pink-500/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                src="/images/404.svg"
                alt="404 Illustration"
                width={400}
                height={400}
                className="mx-auto object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-5xl font-bold text-white"
          >
            Page Not Found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-8 max-w-md text-lg text-gray-200"
          >
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-x-4"
          >
            <Link href="/">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-white transition-all duration-300 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl">
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/support">
              <Button
                variant="outline"
                className="border-2 border-white/20 bg-white/10 px-8 py-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
              >
                Need Help?
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-sm text-gray-300"
        >
          <p>
            © {new Date().getFullYear()} Tasker Company CRM. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
