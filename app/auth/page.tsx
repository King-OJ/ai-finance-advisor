"use client";
import React, { useState } from "react";
import LoginForm from "../_components/LoginForm";
import SignUpForm from "../_components/SignUpForm";

function page() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="container mx-auto flex flex-1 items-center">
      {isLogin ? (
        <LoginForm toggleLogin={() => setIsLogin((prevState) => !prevState)} />
      ) : (
        <SignUpForm toggleLogin={() => setIsLogin((prevState) => !prevState)} />
      )}
    </div>
  );
}

export default page;
