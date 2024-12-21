import Image from "next/image";
import { Button } from "@/components/ui/button";
import Authroizedbrands from "./authroizedbrands";

const awards = [
  {
    src: "/placeholder.svg?height=50&width=50",
    alt: "Excellence in Service Award",
  },
  { src: "/placeholder.svg?height=50&width=50", alt: "Top HVACR Company" },
  { src: "/placeholder.svg?height=50&width=50", alt: "Customer Trust Award" },
  { src: "/placeholder.svg?height=50&width=50", alt: "Innovation in HVACR" },
  {
    src: "/placeholder.svg?height=50&width=50",
    alt: "Quality Service Recognition",
  },
];

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="flex max-w-xl flex-col space-y-8">
            <div className="w-fit rounded-full border px-4 py-1 text-sm">
              Reliable HVACR Solutions with Tasker
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
              HVACR Services for Comfort & Efficiency
            </h1>
            <p className="text-lg text-muted-foreground">
              Tasker is your trusted partner for Heating, Ventilation, Air
              Conditioning, and Refrigeration services. Ensure optimal
              performance and energy efficiency with our expert solutions
              tailored to your needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Our Services</Button>
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </div>

            {/* Awards Section */}
            <Authroizedbrands />
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative h-[500px] w-full">
            <div className="absolute inset-0">
              {/* Decorative Elements */}
              <div className="absolute left-1/4 top-1/4 h-8 w-8 animate-bounce text-blue-400">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Cooling icon"
                  width={32}
                  height={32}
                />
              </div>
              <div className="absolute right-1/4 top-1/3 h-8 w-8 animate-pulse">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Heating icon"
                  width={32}
                  height={32}
                />
              </div>
              <div className="absolute bottom-1/4 right-1/3 h-8 w-8">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Ventilation icon"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            <Image
              src="/pngwing.com (1).png"
              alt="Tasker HVACR Services"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <Authroizedbrands />
      </div>
    </div>
  );
}
