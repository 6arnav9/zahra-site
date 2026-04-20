import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Open_Sans, Cinzel } from "next/font/google";
import "./globals.css";
// IMPORT COMPONENTS
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel",
  weight: ["400", "700", "800"] 
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
  title: "Al Zahra HR | Global Recruitment Authority",
  description: "Bespoke overseas recruitment solutions for world-class enterprises across the Middle East and Europe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${cormorant.variable} ${cinzel.variable} ${montserrat.variable} ${openSans.variable} font-sans antialiased bg-black text-white flex flex-col min-h-screen`}>
        <Navbar />
        {/* Main content wrapper to push footer to the bottom if content is short */}
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}