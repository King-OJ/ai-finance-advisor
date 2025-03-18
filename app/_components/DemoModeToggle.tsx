// components/demo/DemoModeToggle.jsx
"use client";

import { useState, useEffect } from "react";
import { Beaker } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppContext } from "./HomeWrapper";

export default function DemoModeToggle({
  onToggle,
}: {
  onToggle: (value: boolean) => void;
}) {
  const { isDemoMode, toggleDemoMode } = useAppContext();

  // useEffect(() => {
  //   // Check if demo mode is enabled in localStorage
  //   const storedDemoMode = localStorage.getItem("demoMode") === "true";
  //   setIsDemoMode(storedDemoMode);
  // }, []);

  // const handleToggle = () => {
  //   const newDemoMode = !isDemoMode;
  //   setIsDemoMode(newDemoMode);
  //   localStorage.setItem("demoMode", newDemoMode.toString());

  //   if (onToggle) {
  //     onToggle(newDemoMode);
  //   }
  // };

  return (
    <div className="flex items-center space-x-2 p-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Beaker size={18} className="mr-2 text-primary" />
              <span className="text-sm font-medium">Demo Mode</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm max-w-xs">
              Enable demo mode to see how the app works with sample data. No
              real data will be modified.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Switch
        checked={isDemoMode}
        onCheckedChange={toggleDemoMode}
        aria-label="Toggle demo mode"
      />
    </div>
  );
}
