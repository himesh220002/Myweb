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
  title: "CypherTech | Premium Engineering & Stunning Design",
  description: "CypherTech is an elite digital agency delivering high-performance engineering, stunning design, and reliable software solutions for modern startups and enterprise teams.",
  keywords: ["CypherTech", "Digital Solutions", "Portfolio", "Software Engineering", "Project Delivery", "Web Development", "Stunning Design"],
  authors: [{ name: "CypherTech Team" }],
  icons: {
    icon: [
      { url: "/hexagon-alien2.png", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/hexagon-alien2.png",
    apple: [{ url: "/hexagon-alien2.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "CypherTech | Premium Engineering & Stunning Design",
    description: "Elite digital agency showcasing high-performance engineering and stunning user experiences.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://CypherTech.com",
    siteName: "CypherTech",
    locale: "en_US",
    type: "website",
    images: [{ url: "/hexagon-alien2.png", width: 1024, height: 1024, alt: "CypherTech Logo" }],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://CypherTech.com"),
  twitter: {
    card: "summary_large_image",
    title: "CypherTech | Premium Engineering",
    description: "Elite digital agency showcasing high-performance engineering and stunning design.",
    images: ["/hexagon-alien2.png"],
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
      className={`${inter.variable} ${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow overflow-x-visible">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
