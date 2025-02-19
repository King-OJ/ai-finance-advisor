import Image from "next/image";
import React from "react";
import logo from "@/public/uifry_logo.png";
import Link from "next/link";
import NavButtons from "./NavButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center p-6 w-full">
      <div className="flex space-x-4 items-center">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="AI finance advisor logo"
            sizes="100vw"
            className="w-auto h-auto"
          />
        </Link>

        <div className="text-2xl font-bold ">AI Finance Advisor</div>
      </div>

      {session ? <Button>Logout</Button> : <NavButtons />}
    </nav>
  );
}

export default Navbar;
