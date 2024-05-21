"use client";

import { AppContextProvider } from "@/contexts/AppContext";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <AppContextProvider>
      <div className="w-screen h-screen">
        <Header />
        <main>{children}</main>
        <div className="w-full my-4">
          <hr className="border-t border-blue-300 w-2/3 mx-auto" />
        </div>
        <Footer />
      </div>
    </AppContextProvider>
  );
}
