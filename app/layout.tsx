import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CypherTech | Digital Solutions & Premium Project Delivery",
  description: "CypherTech is a premium digital agency showcasing elite project delivery, innovative client solutions, and high-impact software engineering.",
  keywords: ["CypherTech", "Digital Solutions", "Portfolio", "Software Engineering", "Project Delivery", "Web Development"],
  authors: [{ name: "CypherTech Team" }],
  openGraph: {
    title: "CypherTech | Digital Solutions & Premium Project Delivery",
    description: "Elite digital agency showcasing innovative client solutions and high-impact engineering.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://cyphertech.com",
    siteName: "CypherTech",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://cyphertech.com"),
  twitter: {
    card: "summary_large_image",
    title: "CypherTech | Digital Solutions",
    description: "Elite digital agency showcasing innovative client solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
