import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  RocketIcon,
  BarChartIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">
          Your Personal AI-Powered Finance Advisor
        </h1>
        <p className="text-xl text-secondary-foreground mb-8">
          Make smarter financial decisions with the help of AI. Get personalized
          advice, insights, and recommendations.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="" asChild>
            <Link href={"/dashboard"}>Get Financial Advice</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={"/auth"}>Sign Up</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <RocketIcon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>AI-Driven Insights</CardTitle>
                <CardDescription>
                  Get actionable insights tailored to your financial situation.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChartIcon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>Portfolio Optimization</CardTitle>
                <CardDescription>
                  Optimize your investment portfolio with AI recommendations.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <LightningBoltIcon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>Real-Time Analysis</CardTitle>
                <CardDescription>
                  Stay ahead with real-time financial analysis and alerts.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold  mb-4">
            Collaborate or hire the developer?
          </h2>
          <p className="text-xl text-secondary-foreground mb-8">
            Leave us your valid email address and expect to hear from us.
          </p>
          <div className="flex justify-center gap-4">
            <Input
              className="max-w-md"
              placeholder="Enter your email"
              type="email"
            />
            <Button>Yes, Contact Me!</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
