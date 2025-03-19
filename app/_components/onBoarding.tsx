// app/dashboard/onboarding/page.jsx
"use client";

import {
  ChevronRight,
  CreditCard,
  PiggyBank,
  Briefcase,
  Target,
  Check,
  ArrowLeft,
  Beaker,
  Lightbulb,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface onBoardingProps {
  handleSkip: () => void;
  handleBack: () => void;
  handleNext: () => void;
  handleEnableDemo: () => void;
  totalSteps: number;
  currentStep: number;
}

export default function Onboarding({
  handleEnableDemo,
  handleNext,
  handleBack,
  handleSkip,
  totalSteps,
  currentStep,
}: onBoardingProps) {
  return (
    <div className="py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          className={`gap-2 ${currentStep == 1 && "invisible"}`}
          onClick={handleBack}
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index + 1 <= currentStep ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </div>

      {currentStep === 1 && (
        <Card className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to Smart Finance Advisor
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Let's set up your financial dashboard to get personalized insights
              and recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="default"
              size="lg"
              className="flex-1 gap-2 py-10"
              onClick={handleNext}
            >
              <div className="flex flex-col items-center text-center">
                <CreditCard size={24} className="mb-2" />
                <span className="font-medium">Set up my account</span>
                <span className="text-xs text-white/80 mt-1">
                  Add your financial data
                </span>
              </div>
              <ChevronRight className="ml-2" size={16} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex-1 gap-2 py-10"
              onClick={handleEnableDemo}
            >
              <div className="flex flex-col items-center text-center">
                <Beaker size={24} className="mb-2" />
                <span className="font-medium">Try demo mode</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Explore with sample data
                </span>
              </div>
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Your data is encrypted and never shared with third parties.
          </p>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Connect Your Accounts</h2>
          <p className="mb-6 text-gray-600">
            Link your financial accounts to automatically import transactions
            and balances.
          </p>

          <Tabs defaultValue="banks" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="banks">Banks</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="credit">Credit Cards</TabsTrigger>
            </TabsList>

            <TabsContent value="banks" className="space-y-4">
              {/* Bank connection UI would go here */}
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <PiggyBank size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">First Bank</h3>
                    <p className="text-sm text-gray-500">Current, Savings</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              {/* More banks would be listed here */}
            </TabsContent>

            <TabsContent value="investments" className="space-y-4">
              {/* Investment connection UI */}
            </TabsContent>

            <TabsContent value="credit" className="space-y-4">
              {/* Credit card connection UI */}
            </TabsContent>
          </Tabs>

          <p className="text-sm text-gray-500 mb-6">
            Don't see your institution? You can add accounts manually in the
            next step.
          </p>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Continue</Button>
          </div>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Set Your Financial Goals</h2>
          <p className="mb-6 text-muted-foreground">
            Define what you're saving for to get personalized advice and track
            your progress.
          </p>

          <div className="space-y-4 mb-8">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Emergency Fund</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Target Amount
                </span>
                <span className="font-medium">$10,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div
                  className="bg-primary rounded-full h-2"
                  style={{ width: "30%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$3,000 saved</span>
                <span>$7,000 to go</span>
              </div>
            </div>

            <Button variant="outline" className="w-full py-6 border-dashed">
              <div className="flex flex-col items-center">
                <Plus size={20} className="mb-2" />
                <span>Add another goal</span>
              </div>
            </Button>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Continue</Button>
          </div>
        </Card>
      )}

      {currentStep === 4 && (
        <Card className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold mb-4">You're all set!</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Your financial dashboard is ready. We've prepared personalized
            insights based on your data.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border rounded-lg p-4 text-left">
              <Target size={20} className="text-primary mb-2" />
              <h3 className="font-medium mb-1">Goal Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor progress toward your financial goals
              </p>
            </div>

            <div className="border rounded-lg p-4 text-left">
              <CreditCard size={20} className="text-primary mb-2" />
              <h3 className="font-medium mb-1">Spending Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Understand where your money goes
              </p>
            </div>

            <div className="border rounded-lg p-4 text-left">
              <Briefcase size={20} className="text-primary mb-2" />
              <h3 className="font-medium mb-1">Portfolio Overview</h3>
              <p className="text-sm text-muted-foreground">
                View all your investments in one place
              </p>
            </div>

            <div className="border rounded-lg p-4 text-left">
              <Lightbulb size={20} className="text-primary mb-2" />
              <h3 className="font-medium mb-1">AI Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized financial advice
              </p>
            </div>
          </div>

          <Button size="lg" onClick={handleNext}>
            Go to Dashboard
          </Button>
        </Card>
      )}
    </div>
  );
}
