"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Onboarding from "./onBoarding";
import { usePathname, useRouter } from "next/navigation";

interface AppContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  openDemoModal: () => void;
}
const AppStatesContext = createContext<AppContextType | undefined>(undefined);

function HomeWrapper({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const closeModal = () => setIsOpen(false);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const openDemoModal = () => {
    setIsOpen(true);
    setCurrentStep(2);
  };

  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    localStorage.setItem("demoMode", newDemoMode.toString());
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      closeModal();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      closeModal();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingCompleted", "true");
    closeModal();
  };

  const handleEnableDemo = () => {
    localStorage.setItem("demoMode", "true");
    localStorage.setItem("onboardingCompleted", "true");
    closeModal();
  };

  useEffect(() => {
    const onboardingCompleted =
      localStorage.getItem("onboardingCompleted") !== "true";
    const isDemoMode = localStorage.getItem("demoMode") === "true";
    setIsDemoMode(isDemoMode);
    setIsOpen(onboardingCompleted);
  }, []);

  return (
    <AppStatesContext.Provider
      value={{ isDemoMode, toggleDemoMode, openDemoModal }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full sm:w-full max-w-3xl">
          <DialogHeader className="sr-only">
            <DialogTitle> Welcome to SmartFi</DialogTitle>
            <DialogDescription>
              A form to get new users onboard
            </DialogDescription>
          </DialogHeader>
          <Onboarding
            handleEnableDemo={handleEnableDemo}
            handleBack={handleBack}
            handleNext={handleNext}
            handleSkip={handleSkip}
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
        </DialogContent>
      </Dialog>
    </AppStatesContext.Provider>
  );
}

export default HomeWrapper;

export const useAppContext = () => {
  const context = useContext(AppStatesContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
