"use client";

import { AppContextProvider } from "@/contexts/AppContext";
import Footer from "@/components/footer";
import Header from "@/components/header";
import WordCards from "@/components/wordcards";
import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <AppContextProvider>
      <div className="w-screen h-screen">
        <Header />
        <main>{children}</main>
        <WordCards />
        <Footer />
      </div>
    </AppContextProvider>
  );
}
