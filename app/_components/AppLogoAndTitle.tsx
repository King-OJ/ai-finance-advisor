import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/uifry_logo.png";

function AppLogoAndTitle() {
  return (
    <div className="flex space-x-2 items-center">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="AI finance advisor logo"
          sizes="100vw"
          className="w-auto h-auto"
        />
      </Link>

      <div className="text-xl font-bold ">AI Finance Advisor</div>
    </div>
  );
}

export default AppLogoAndTitle;
