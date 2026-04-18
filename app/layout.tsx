import type { Metadata } from "next";
import { Cinzel, Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
// IMPORT YOUR NEW NAVBAR
import Navbar from "./components/Navbar"; 

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel",
  weight: ["400", "700"] 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["400", "700", "800"] 
});

const openSans = Open_Sans({ 
  subsets: ["latin"], 
  variable: "--font-open-sans",
  weight: ["400", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Al Zahra HR Consultancy",
  description: "Global recruitment solutions since 2001",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ADD suppressHydrationWarning HERE */}
      <body suppressHydrationWarning className={`${cinzel.variable} ${montserrat.variable} ${openSans.variable} font-sans antialiased bg-black text-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}