import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { AuthProvider } from "./_components/auth-provider";

export const metadata: Metadata = {
  title: "Smart Fi",
  description: "AI-Powered Personal Finance Dashboard & Advisor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-generalSans antialiased`}>
        <AuthProvider>
          <main className="min-h-screen flex flex-col justify-between max-w-6xl mx-auto">
            <Navbar />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
          </main>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
