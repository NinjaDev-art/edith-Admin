
import React from "react";
import { Search, Bell } from "lucide-react";

interface HeaderProps {
  activeSection: string;
}

export function DashboardHeader({ activeSection }: HeaderProps) {
  const titles: Record<string, string> = {
    "overview": "Dashboard Overview",
    "model-pricing": "Model Pricing & Multipliers",
    "user-analytics": "User Analytics",
    "plans": "Plans Management",
    "revenue": "Revenue & Metrics",
    "notifications": "Notifications",
    "logs": "Audit Logs",
    "settings": "Settings",
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-900">{titles[activeSection] || "Dashboard"}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary w-64"
          />
        </div>
        
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-dashboard-primary transition-colors" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-dashboard-primary text-white rounded-full flex items-center justify-center text-[10px] font-medium">3</div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-dashboard-primary flex items-center justify-center">
            <span className="text-white text-sm font-medium">AD</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@pointprism.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
