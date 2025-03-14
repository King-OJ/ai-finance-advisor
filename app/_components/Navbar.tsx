"use client";
import React from "react";
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
    pathname.includes("/transactions") ||
    pathname.includes("/goals") ||
    pathname.includes("/ai_advisor")
  ) {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-6 w-full">
      <AppLogoAndTitle />

      {isSignUpPage || isloginPage ? null : (
        <nav>
          <Button>
            <Link href={"/dashboard"}>Get Started</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
