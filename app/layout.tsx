import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ClientProvider from "./ClientProvider";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exclusive Ecommerce | Premium Products at Best Prices",
  description:
    "Shop exclusive products online at unbeatable prices. Secure checkout, fast delivery, and top-notch customer support. Developed by Saim Amjad.",
  keywords: [
    "Exclusive Ecommerce",
    "online shopping",
    "premium products",
    "fast delivery",
    "best ecommerce site",
    "Saim Amjad",
  ],
  authors: [{ name: "Saim Amjad", url: "https://exclusive-website01.vercel.app" }],
  generator: "Next.js 15",
  metadataBase: new URL("https://exclusive-website01.vercel.app"),
  openGraph: {
    title: "Exclusive Ecommerce | Premium Products Online",
    description:
      "Discover the latest premium products at the best prices. Fast shipping. Trusted by thousands. Built with Next.js 15 by Saim Amjad.",
    url: "https://exclusive-website01.vercel.app",
    siteName: "Exclusive Ecommerce",
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists in /public
        width: 1200,
        height: 630,
        alt: "Exclusive Ecommerce - Premium Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Ecommerce | Premium Products Online",
    description:
      "Buy exclusive products online at unbeatable prices with fast delivery. Built with Next.js 15 by Saim Amjad.",
  },
  themeColor: "#ffffff",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Saim Amjad" />
        <link rel="canonical" href="https://exclusive-website01.vercel.app/" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ClientProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              className: poppins.className,
            }}
          />
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
