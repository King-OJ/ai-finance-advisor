"use client";
import React from "react";
import EmptyState from "./EmptyState";
import { useAppContext } from "./HomeWrapper";

function AppEmptyState() {
  const { toggleDemoMode } = useAppContext();
  const handleEnableDemo = () => {
    toggleDemoMode(true);
  };
  return <EmptyState onEnableDemo={handleEnableDemo} />;
}

export default AppEmptyState;
