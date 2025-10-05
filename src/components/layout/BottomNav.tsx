import { Home, PlusCircle, Search, Wrench, MessageCircle, User, Plane } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import NotificationBadge from "@/components/notifications/NotificationBadge";
import { memo } from "react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: PlusCircle, label: "Sell", path: "/sell" },
  { icon: Search, label: "Wanted", path: "/wanted" },
  { icon: Wrench, label: "Services", path: "/services" },
  { icon: Plane, label: "Leaving", path: "/leaving-island" },
  { icon: MessageCircle, label: "Inbox", path: "/inbox" },
  { icon: User, label: "Account", path: "/account" },
] as const;

const BottomNav = memo(() => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-smooth relative",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
                {item.path === "/inbox" && <NotificationBadge />}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

BottomNav.displayName = "BottomNav";

export default BottomNav;
