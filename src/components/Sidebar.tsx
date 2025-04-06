
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  Home,
  Network,
  Settings,
  Target,
  Calendar,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Node Editor", icon: Edit3, path: "/dashboard/node-editor" },
    { name: "Neural Map", icon: Network, path: "/dashboard/neural-map" },
    { name: "Focus Mode", icon: Target, path: "/dashboard/focus" },
    { name: "Time Capsule", icon: Clock, path: "/dashboard/time-capsule" },
    { name: "Calendar", icon: Calendar, path: "/dashboard/calendar" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col border-r border-neural-muted/30 bg-neural-muted/10 backdrop-blur-sm h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-neural-muted/30">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          <Brain className="h-6 w-6 text-neural-primary" />
          {!collapsed && <span className="ml-2 font-bold neural-text">MindMesh</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("text-muted-foreground hover:text-foreground", collapsed && "absolute right-[-12px] top-6 bg-neural-muted/30 border border-neural-muted/40 rounded-full h-6 w-6")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                asChild
                className={cn(
                  "w-full justify-start mb-1 hover:bg-neural-muted/30",
                  isActive ? "bg-neural-muted/30 text-foreground" : "text-muted-foreground hover:text-foreground",
                  collapsed ? "px-2" : "px-3"
                )}
              >
                <Link to={item.path} className={cn("flex items-center", collapsed && "justify-center")}>
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-2">{item.name}</span>}
                </Link>
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-neural-muted/30">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          asChild
          className={cn(
            "w-full justify-start hover:bg-neural-muted/30",
            location.pathname === "/dashboard/settings" ? "bg-neural-muted/30 text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Link to="/dashboard/settings" className={cn("flex items-center", collapsed && "justify-center")}>
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="ml-2">Settings</span>}
          </Link>
        </Button>
      </div>
    </div>
  );
};
