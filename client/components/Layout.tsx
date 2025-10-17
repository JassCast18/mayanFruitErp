import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Bell, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function Layout({ children, title, subtitle }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <header className="bg-white dark:bg-card border-b border-border h-16 flex items-center justify-between px-6 md:px-8">
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-foreground">
              {title || "Dashboard"}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
