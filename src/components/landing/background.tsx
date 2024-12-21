"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useScroll } from "framer-motion";

const AnimatedBackground = () => {
  const controls = useAnimation();
  const { scrollY } = useScroll();

  // Update animation based on scroll
  useEffect(() => {
    const updateAnimation = () => {
      controls.start({
        backgroundColor: scrollY.get() > 200 ? "#f0f9ff" : "#ffffff", // Lighter blue on scroll
      });
    };

    const unsubscribe = scrollY.onChange(updateAnimation);
    return () => unsubscribe();
  }, [controls, scrollY]);

  // Animation Variants
  const floatAnimation = {
    animate: {
      y: [0, 40, 0],
      x: [0, 20, 0],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingElements = [
    {
      size: 100,
      gradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(0, 150, 255, 0.3))",
      top: "15%",
      left: "10%",
    },
    {
      size: 140,
      gradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(80, 200, 120, 0.3))",
      top: "40%",
      left: "70%",
    },
    {
      size: 120,
      gradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(220, 80, 120, 0.3))",
      top: "60%",
      left: "30%",
    },
    {
      size: 80,
      gradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(250, 210, 80, 0.3))",
      top: "75%",
      left: "50%",
    },
    {
      size: 150,
      gradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(100, 120, 250, 0.3))",
      top: "10%",
      left: "80%",
    },
  ];

  return (
    <motion.div
      animate={controls}
      initial={{ backgroundColor: "#ffffff" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            top: element.top,
            left: element.left,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: element.gradient,
            borderRadius: "50%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          variants={floatAnimation}
          animate="animate"
        />
      ))}
    </motion.div>
  );
};

export default AnimatedBackground;
