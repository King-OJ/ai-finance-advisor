"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AppLogoAndTitle from "./AppLogoAndTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  const isSignUpPage = pathname == "/signup";
  const isloginPage = pathname == "/login";

  if (
    pathname.includes("/dashboard") ||
    pathname.includes("/portfolio") ||
    pathname.includes("/profile")
  ) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-6 w-full">
      <AppLogoAndTitle />

      {isSignUpPage || isloginPage ? null : (
        <Button>
          <Link href={"/signup"}>Get Started</Link>
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
