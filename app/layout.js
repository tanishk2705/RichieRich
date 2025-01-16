import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({subsets:["latin"]})

export const metadata = {
  title: "RichiRich",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}>
        <Header/>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-blue-200 py-8 text-center">Made with ❤️ by @Tanishk</footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
