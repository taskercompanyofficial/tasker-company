import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-4 border-t bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">Tasker Company</h3>
            <p className="mb-4 hover:text-primary">
              Your trusted partner for all HVACR services across Pakistan since
              2016.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors hover:text-primary">
                <Facebook />
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <Twitter />
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <Instagram />
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <Linkedin />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/ac-installation"
                  className="transition-colors hover:text-primary"
                >
                  AC Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ac-repair"
                  className="transition-colors hover:text-primary"
                >
                  AC Repair
                </Link>
              </li>
              <li>
                <Link
                  href="/services/maintenance"
                  className="transition-colors hover:text-primary"
                >
                  Maintenance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/energy-solutions"
                  className="transition-colors hover:text-primary"
                >
                  Energy Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold">Contact Us</h4>
            <ul className="space-y-2 hover:text-primary">
              <li>Phone: +92 302-5117000</li>
              <li>Email: info@taskercompany.com</li>
              <li>
                Address: E150/2, st9, Iqbal Park, DHA Main Boulevard, Lahore
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Tasker Company. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
