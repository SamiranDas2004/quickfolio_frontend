import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
// import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quickfolio - AI-Powered Portfolio Builder | Create Your Professional Portfolio",
  description: "Build stunning AI-powered portfolios in minutes. Showcase your projects, skills, and experience with our intelligent portfolio builder. Stand out from the crowd with Quickfolio.",
  keywords: ["portfolio builder", "AI portfolio", "professional portfolio", "developer portfolio", "online resume", "portfolio website", "AI-powered", "quickfolio"],
  authors: [{ name: "Quickfolio" }],
  creator: "Quickfolio",
  publisher: "Quickfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quickfolio.in",
    title: "Quickfolio - AI-Powered Portfolio Builder",
    description: "Build stunning AI-powered portfolios in minutes. Showcase your projects, skills, and experience.",
    siteName: "Quickfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Quickfolio - AI-Powered Portfolio Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quickfolio - AI-Powered Portfolio Builder",
    description: "Build stunning AI-powered portfolios in minutes",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="canonical" href="https://quickfolio.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#18181b",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
          {children}
          <Analytics />
      </body>
    </html>
  );
}
