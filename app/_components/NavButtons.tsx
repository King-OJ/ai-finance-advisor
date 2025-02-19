"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function NavButtons() {
  const pathname = usePathname();

  const isSignUpPage = pathname.includes("/signup");
  const isloginPage = pathname.includes("/login");

  return isSignUpPage || isloginPage ? null : (
    <Button>
      <Link href={"/signup"}>Get Started</Link>
    </Button>
  );
}

export default NavButtons;
