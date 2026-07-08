import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AccessibilityFAB from "@/features/dashboard/components/AccessibilityFAB";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KrishiSarathi - AI Decision OS",
  description: "Next-gen agricultural intelligence",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <AccessibilityFAB />
      </body>
    </html>
  );
}
