import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Warehouse,
  Calculator,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Productos",
    href: "/productos",
    icon: <Package className="w-5 h-5" />,
    submenu: [
      { label: "Frutas Propias", href: "/productos/frutas", icon: null },
      { label: "Productos Requeridos", href: "/productos/requeridos", icon: null },
    ],
  },
  {
    label: "Clientes",
    href: "/clientes",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Proveedores",
    href: "/proveedores",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Ventas",
    href: "/ventas",
    icon: <TrendingUp className="w-5 h-5" />,
    badge: "Órdenes",
  },
  {
    label: "Compras",
    href: "/compras",
    icon: <ShoppingCart className="w-5 h-5" />,
    badge: "Órdenes",
  },
  {
    label: "Inventario",
    href: "/inventario",
    icon: <Warehouse className="w-5 h-5" />,
  },
  {
    label: "Contabilidad",
    href: "/contabilidad",
    icon: <Calculator className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 top-12"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative left-0 top-0 h-screen bg-sidebar text-sidebar-foreground w-64 transform transition-transform duration-300 z-40 md:z-0 md:translate-x-0 flex flex-col border-r border-sidebar-border",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Package className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-primary">MAYAN</h1>
              <p className="text-xs text-sidebar-accent-foreground">FRUIT ERP</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <div
                  className="flex items-center justify-between"
                  onClick={() =>
                    item.submenu && toggleSubmenu(item.label)
                  }
                >
                  <Link
                    to={item.href}
                    onClick={() => !item.submenu && setIsOpen(false)}
                    className={cn(
                      "flex-1 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent text-sidebar-foreground"
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs bg-sidebar-primary/80 px-2 py-1 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  {item.submenu && (
                    <button
                      className={cn(
                        "px-2 py-2 transition-transform",
                        expandedMenu === item.label && "rotate-180"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && expandedMenu === item.label && (
                  <ul className="mt-2 ml-6 space-y-1 border-l border-sidebar-accent">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.label}>
                        <Link
                          to={subitem.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors",
                            isActive(subitem.href)
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                          )}
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-accent-foreground space-y-1">
            <p className="font-medium">Admin Panel</p>
            <p>Sistema ERP - MAYAN FRUIT</p>
          </div>
        </div>
      </aside>
    </>
  );
}
