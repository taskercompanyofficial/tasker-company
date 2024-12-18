import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

const socialLinks = [
  {
    name: "Call Us",
    color: "bg-blue-500",
    icon: <FaPhoneAlt size={20} />,
    contact: "tel:923025117000", // Use tel: for phone numbers
  },
  {
    name: "Facebook",
    color: "bg-blue-700",
    icon: <FaFacebookF size={20} />,
    contact: "https://www.facebook.com/people/Tasker-Company/61569484306804/",
  },
  {
    name: "Instagram",
    color: "bg-pink-500",
    icon: <FaInstagram size={20} />,
    contact:
      "https://www.instagram.com/tasker_company/profilecard/?igsh=cnB2MHM2Y3ZnMHo2",
  },

  {
    name: "TikTok",
    color: "bg-black",
    icon: <FaTiktok size={20} />,
    contact: "https://www.tiktok.com/@tasker_company?_t=8rz5wj7lgXK&_r=1",
  },
  {
    name: "WhatsApp",
    color: "bg-green-400",
    icon: <IoLogoWhatsapp size={20} />,
    contact: "https://wa.me/923025117000", // Use wa.me link for WhatsApp
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed right-3 top-1/2 z-50 -translate-y-1/2 transform space-y-4">
      {socialLinks.map((link, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <a
              key={index}
              href={link.contact}
              target={link.contact.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`group flex items-center justify-center ${link.color} transform rounded-full border-2 border-white p-3 text-white shadow-lg transition-transform hover:scale-110`}
            >
              <TooltipTrigger>{link.icon}</TooltipTrigger>
              <TooltipContent>{link.name}</TooltipContent>
            </a>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
