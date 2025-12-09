import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";
import "../styles/animate.min.css";
import "../styles/odometer.css";
import "../styles/style.css";
import "../styles/swiper.min.css";

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SACCO Management System",
  description: "Comprehensive SACCO management system for member registration, savings, loans, and reporting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} font-sans`}>
      <body className="font-outfit antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

