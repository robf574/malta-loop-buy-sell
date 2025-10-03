import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function AppLayout({ children, showNav = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className={showNav ? "pb-nav" : ""}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
