
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { 
  PieChart, 
  BarChart, 
  Settings, 
  Users, 
  Database, 
  Activity, 
  LogOut,
  FileText,
  Bell
} from "lucide-react";

interface SidebarNavProps {
  className?: string;
  onNavChange: (section: string) => void;
  activeSection: string;
}

export function DashboardSidebar({ className, onNavChange, activeSection }: SidebarNavProps) {
  const menuItems = [
    { icon: PieChart, label: "Overview", id: "overview" },
    { icon: BarChart, label: "Model Pricing", id: "model-pricing" },
    { icon: Users, label: "User Analytics", id: "user-analytics" },
    { icon: Database, label: "Plans", id: "plans" },
    { icon: Activity, label: "Revenue & Metrics", id: "revenue" },
    { icon: Bell, label: "Notifications", id: "notifications" },
    { icon: FileText, label: "Audit Logs", id: "logs" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  return (
    <Sidebar className={cn("border-r", className)}>
      <SidebarHeader className="px-6 py-5 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-dashboard-primary flex items-center justify-center">
            <span className="font-bold text-white text-sm">PP</span>
          </div>
          <span className="font-semibold text-lg">Point Prism</span>
        </div>
        <span className="text-xs text-muted-foreground">Admin Dashboard</span>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm transition-colors",
                      activeSection === item.id
                        ? "bg-dashboard-primary bg-opacity-10 text-dashboard-primary font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                    onClick={() => onNavChange(item.id)}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      activeSection === item.id ? "text-dashboard-primary" : "text-gray-500"
                    )} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto border-t p-4">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full px-3 py-2">
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
