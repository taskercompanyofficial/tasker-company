import React from "react";
import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { MdMailLock } from "react-icons/md";

export default function SocialLogin() {
  return (
    <>
      <Button
        effect="ringHover"
        size="icon"
        className="rounded-full bg-gray-100 shadow-md transition-all duration-300 hover:bg-gray-200 hover:ring-gray-200"
      >
        <FcGoogle />
      </Button>
      <Button
        effect="ringHover"
        size="icon"
        className="rounded-full bg-gray-100 text-black shadow-md duration-300 hover:bg-gray-200 hover:ring-gray-200 hover:transition-all"
      >
        <FaGithub />
      </Button>
      <Button
        effect="ringHover"
        size="icon"
        className="rounded-full bg-gray-100 text-black shadow-md duration-300 hover:bg-gray-200 hover:ring-gray-200 hover:transition-all"
      >
        <MdMailLock />
      </Button>
    </>
  );
}
