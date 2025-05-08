
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/Sidebar";
import { DashboardHeader } from "@/components/Dashboard/Header";
import { DashboardOverview } from "@/components/Dashboard/Overview";
import { ModelPricing } from "@/components/Dashboard/ModelPricing";
import { UserAnalytics } from "@/components/Dashboard/UserAnalytics";
import { Plans } from "@/components/Dashboard/Plans";
import { RevenueMetrics } from "@/components/Dashboard/RevenueMetrics";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "model-pricing":
        return <ModelPricing />;
      case "user-analytics":
        return <UserAnalytics />;
      case "plans":
        return <Plans />;
      case "revenue":
        return <RevenueMetrics />;
      case "notifications":
      case "logs":
      case "settings":
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-xl text-gray-500">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section coming soon...
            </p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar 
            onNavChange={setActiveSection} 
            activeSection={activeSection} 
          />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader activeSection={activeSection} />
            
            <main className="flex-1 p-6 overflow-y-auto">
              {renderContent()}
            </main>
            
            <footer className="border-t p-4 text-center text-xs text-gray-500">
              &copy; 2025 Edith. All rights reserved. Admin Dashboard v1.0.
            </footer>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
