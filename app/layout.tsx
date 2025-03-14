import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Provider } from "./providers";

export const metadata: Metadata = {
  title: "Smart Fi",
  description: "Make smarter financial decisions with AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-generalSans antialiased`}>
        <Provider>
          <div className="min-h-screen flex flex-col justify-between max-w-6xl mx-auto">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
