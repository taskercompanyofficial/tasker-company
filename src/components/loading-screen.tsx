"use client";

import * as React from "react";
import { Command } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  text?: string;
}

export function LoadingScreen({
  text = "Loading your workspace...",
}: LoadingScreenProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 20, 100));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* Background animated gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "linear-gradient(45deg, var(--primary) 0%, transparent 100%)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative flex flex-col items-center gap-8"
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Animated rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-lg bg-primary/20"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative flex h-20 w-20 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-lg">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Command className="h-10 w-10" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold tracking-tighter"
        >
          <span className="bg-gradient-to-r from-primary via-purple-500 to-primary/60 bg-clip-text text-transparent">
            Tasker Company
          </span>
        </motion.div>

        {/* Progress bar */}
        <motion.div className="h-1 w-64 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </motion.div>

        <div className="flex items-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [-6, 6, -6],
                scale: [1, 1.2, 1],
              }}
              transition={{
                y: { duration: 1.2, repeat: Infinity, delay: i * 0.1 },
                scale: { duration: 1.2, repeat: Infinity, delay: i * 0.1 },
                ease: "easeInOut",
              }}
              className="h-3 w-3 rounded-full bg-primary shadow-lg"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-medium text-muted-foreground"
        >
          {progress < 100
            ? `${text} ${Math.round(progress)}%`
            : "Preparing your dashboard..."}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
