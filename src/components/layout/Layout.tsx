import { ReactNode } from "react";
import { StickyHeader } from "./StickyHeader";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
