import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="font-sans">
      <body className="font-sans">{children}</body>
    </html>
  );
}

