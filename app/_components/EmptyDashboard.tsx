"use client";
import { Beaker, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "./HomeWrapper";

export default function EmptyDashboard({
  onEnableDemo,
}: {
  onEnableDemo: () => void;
}) {
  const { openDemoModal } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center max-w-md mx-auto">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <Plus size={32} className="text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        No financial data yet
      </h2>

      <p className="text-muted-foreground mb-8">
        Start by adding your financial information or enable {""}
        <span className="font-bold">Demo mode</span> to explore the app with
        sample data.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button
          variant="default"
          size="lg"
          onClick={openDemoModal}
          className="flex-1 gap-2"
        >
          Add Your Data
          <ArrowRight size={16} />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="flex-1 gap-2"
          onClick={onEnableDemo}
        >
          <Beaker size={16} />
          Try Demo Mode
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        <span className="font-bold">Demo mode</span> uses fictional data and
        doesn't affect your actual financial information. You can switch on/off
        demo mode settings from the app sidebar at anytime.
      </p>
    </div>
  );
}
