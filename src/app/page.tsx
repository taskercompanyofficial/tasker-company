"use client";

import About from "@/components/landing/about";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import MissionVision from "@/components/landing/mission-vision";
import ReviewProcess from "@/components/landing/review-process";
import Services from "@/components/landing/services";
import SocialLinks from "@/components/landing/socialLinks";
import WhyChooseUs from "@/components/landing/why-choose-us";

export default function Home() {
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
      <SocialLinks />
      <Footer />
    </div>
  );
}
