
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { 
  dashboardStats, 
  dailyUsage, 
  modelDistribution, 
  planDistribution 
} from "@/utils/mockData";

export function DashboardOverview() {
  // Colors for the charts
  const COLORS = [
    "#6233EA", "#9B87F5", "#3FB6C4", "#FDB022", "#F04438"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Users" 
          value={dashboardStats.totalUsers.toLocaleString()} 
          change={dashboardStats.userGrowth} 
          period="vs last month"
        />
        <StatsCard 
          title="Total Revenue" 
          value={dashboardStats.totalRevenue} 
          change={dashboardStats.revenueGrowth} 
          period="vs last month"
        />
        <StatsCard 
          title="Points Consumed" 
          value={dashboardStats.totalPointsConsumed} 
          change={dashboardStats.pointsGrowth} 
          period="vs last month"
        />
        <StatsCard 
          title="Profit Margin" 
          value={dashboardStats.profitMargin} 
          change={dashboardStats.marginTrend} 
          period="vs last month"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Points Usage Chart */}
        <Card className="col-span-2 p-5 dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-base">Points Consumed (Last 30 Days)</h3>
            <select className="text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1">
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyUsage}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split(" ")[1]} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => `${value / 1000}k`} 
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()} points`, "Usage"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="freeUsage" stackId="a" fill={COLORS[2]} name="Free" />
                <Bar dataKey="proUsage" stackId="a" fill={COLORS[1]} name="Pro" />
                <Bar dataKey="powerProUsage" stackId="a" fill={COLORS[0]} name="Power Pro" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution Pie Charts */}
        <Card className="p-5 dashboard-card">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-base mb-4">Model Usage Distribution</h3>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {modelDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-4">Plan Distribution</h3>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Users"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Cost Trends Chart */}
      <Card className="p-5 dashboard-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-base">Cost per Point & Active Users</h3>
          <select className="text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1">
            <option value="30">Last 30 Days</option>
            <option value="60">Last 60 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyUsage}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split(" ")[1]} 
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(4)}`} 
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[3500, 'dataMax + 500']}
              />
              <Tooltip 
                formatter={(value: number, name) => {
                  if (name === "Cost Per Point") return [`$${value.toFixed(4)}`, name];
                  return [value.toLocaleString(), name];
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="avgCostPerPoint" 
                stroke={COLORS[0]} 
                strokeWidth={2} 
                dot={false} 
                name="Cost Per Point"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="userCount" 
                stroke={COLORS[2]} 
                strokeWidth={2} 
                dot={false}
                name="Active Users"
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  period: string;
}

function StatsCard({ title, value, change, period }: StatsCardProps) {
  const isPositive = change > 0;
  
  return (
    <Card className="p-5 dashboard-card">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        <span className="text-2xl font-semibold mt-2">{value}</span>
        <div className="flex items-center mt-2">
          <div className={`flex items-center ${isPositive ? 'text-dashboard-success' : 'text-dashboard-danger'}`}>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">{period}</span>
        </div>
      </div>
    </Card>
  );
}
