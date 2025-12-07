import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthContextProvider } from "./_utils/auth-context";
import "./globals.css";
import Header from "@/components/custom/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Project Tracker",
  description: "An app to help students manage all their projects and assignments. Allowing the student to create and manage tasks for each project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
