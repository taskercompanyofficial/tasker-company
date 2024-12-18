"use client";

import About from "@/components/landing/about";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import MissionVision from "@/components/landing/mission-vision";
import ReviewProcess from "@/components/landing/review-process";
import Services from "@/components/landing/services";
import WhyChooseUs from "@/components/landing/why-choose-us";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.token) {
    router.push("/dashboard");
  }
  return (
    <div className="flex min-h-screen flex-col scroll-smooth">
      <LandingHeader />
      <Hero />
      <About />
      <Services />
      <MissionVision />
      <WhyChooseUs />
      <ReviewProcess />
      <Contact />
      <Footer />
    </div>
  );
}
