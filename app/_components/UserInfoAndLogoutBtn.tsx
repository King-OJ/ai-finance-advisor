"use client";
import React, { useState } from "react";
import profilePicPlaceholder from "@/public/profile_picture_placeholder.png";
import { LoadingSpinner } from "./LoadingSpinner";

import Image from "next/image";
import { Session } from "next-auth";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
interface UserInfoAndLogoutBtnProps {
  status: "authenticated" | "loading" | "unauthenticated";
  session: Session | null;
}

function UserInfoAndLogoutBtn({ status, session }: UserInfoAndLogoutBtnProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return status == "loading" ? (
    <LoadingSpinner />
  ) : (
    <div className="relative">
      <button
        onClick={() => setOpenModal(!openModal)}
        className="flex items-center w-full justify-between transition duration-150 hover:bg-background/90 p-2 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          {session?.user && (
            <div className="h-10 w-10 bg-secondary rounded-full overflow-hidden">
              <Image
                alt={"user image"}
                src={session.user.image || profilePicPlaceholder}
                width={0}
                height={0}
                sizes="100vw"
                className="object-cover h-auto w-auto"
              />
            </div>
          )}

          <div className="space-y-2">
            <h5 className="font-bold">{session?.user.name}</h5>
          </div>
        </div>

        <ChevronDown />
      </button>

      {openModal && (
        <div className="absolute  py-2 top-full right-0">
          <Button onClick={() => signOut()} className="font-bold">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserInfoAndLogoutBtn;
