import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthContextProvider } from "./_utils/auth-context";
import "./globals.css";
import Header from "@/components/custom/header"

/**

@author Pre-Generated
@coauthers Nick Brunet
@description Layout for website, 

@date_created December 2nd, 2025

@modified December 6th, 2025

*/

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
  description: "Created by Firaol, Nick & Ahmad",
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
