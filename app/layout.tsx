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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Exclusive Ecommerce",
  description: "Developed by Saim Amjad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
