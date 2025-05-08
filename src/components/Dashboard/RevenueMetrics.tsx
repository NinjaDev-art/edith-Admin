
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
  LineChart,
  Line,
  Legend,
  ComposedChart,
  Area
} from "recharts";
import { revenueData, dailyUsage, plansData } from "@/utils/mockData";

export function RevenueMetrics() {
  // Costs breakdown data
  const costBreakdown = [
    { name: "GPT-4 Turbo", value: 38 },
    { name: "Claude 3 Opus", value: 25 },
    { name: "Claude 3 Sonnet", value: 18 },
    { name: "Others", value: 19 }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold">Revenue & Cost Analysis</h2>
      
      {/* Revenue vs Cost Chart */}
      <Card className="p-5 dashboard-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-base">Revenue vs. Cost (Last 6 Months)</h3>
          <select className="text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1">
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                fill="#6233EA" 
                fillOpacity={0.1} 
                stroke="#6233EA" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#F04438" 
                strokeWidth={2}
                name="Cost"
              />
              <Bar 
                dataKey="profit" 
                fill="#12B76A" 
                name="Profit"
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueData.slice(-1).map((data, i) => (
          <React.Fragment key={i}>
            <MetricsCard 
              title="Monthly Revenue" 
              value={`$${data.revenue.toLocaleString()}`}
              change={8.5}
              changeLabel="vs last month" 
            />
            <MetricsCard 
              title="Monthly Cost" 
              value={`$${data.cost.toLocaleString()}`}
              change={-2.3}
              changeLabel="vs last month" 
            />
            <MetricsCard 
              title="Monthly Profit" 
              value={`$${data.profit.toLocaleString()}`}
              change={12.7}
              changeLabel="vs last month" 
            />
            <MetricsCard 
              title="Profit Margin" 
              value={`${data.margin.toFixed(1)}%`}
              change={3.2}
              changeLabel="vs last month" 
            />
          </React.Fragment>
        ))}
      </div>
      
      {/* Revenue Per User & Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Per User */}
        <Card className="p-5 dashboard-card">
          <h3 className="font-medium text-base mb-4">Revenue Per User</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={plansData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[0, 60]}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value: number, name) => {
                    switch(name) {
                      case 'Revenue': return [`$${value.toFixed(2)}`, name];
                      case 'Cost': return [`$${value.toFixed(2)}`, name];
                      case 'Profit': return [`$${(value).toFixed(2)}`, name];
                      default: return [value, name];
                    }
                  }}
                />
                <Bar dataKey="revenue" name="Revenue" fill="#6233EA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgCost" name="Cost" fill="#F04438" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="#12B76A" radius={[4, 4, 0, 0]} />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Cost Breakdown */}
        <Card className="p-5 dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-base">API Cost Breakdown</h3>
            <select className="text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1">
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
            </select>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total API Costs</p>
                <p className="text-3xl font-semibold">$24,658</p>
                <p className="text-xs text-dashboard-success mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-dashboard-success mr-1"></span>
                  5.3% lower than last month
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg Cost per 1K Points</p>
                <p className="text-3xl font-semibold">$0.83</p>
                <p className="text-xs text-dashboard-success mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-dashboard-success mr-1"></span>
                  3.1% lower than last month
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Cost Distribution by Model</h4>
              {costBreakdown.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-dashboard-primary h-2 rounded-full" 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      {/* User Economics */}
      <Card className="p-5 dashboard-card">
        <h3 className="font-medium text-base mb-6">User Economics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">CAC</h4>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Quarterly</span>
            </div>
            <p className="text-2xl font-semibold">$25.40</p>
            <p className="text-xs text-dashboard-success mt-1">
              14.3% lower than previous quarter
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Customer acquisition cost continues to improve as word-of-mouth referrals increase
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">LTV</h4>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Projected</span>
            </div>
            <p className="text-2xl font-semibold">$284.75</p>
            <p className="text-xs text-dashboard-success mt-1">
              8.7% higher than previous calculation
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Improved retention rates have positively impacted lifetime value projections
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">LTV:CAC Ratio</h4>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Healthy</span>
            </div>
            <p className="text-2xl font-semibold">11.2x</p>
            <p className="text-xs text-dashboard-success mt-1">
              22.8% better than industry benchmark
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Current ratio indicates strong unit economics and scaling potential
            </p>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Cost Optimization Opportunities</h4>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm font-medium text-blue-800">Model Substitution</p>
              <p className="text-xs text-blue-700 mt-1">
                Switching 30% of GPT-4 Turbo usage to DeepSeek V3 could save approximately $4,200/month with minimal quality impact.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm font-medium text-green-800">Context Optimization</p>
              <p className="text-xs text-green-700 mt-1">
                Implementing smart context trimming could reduce token usage by ~18%, resulting in $3,800/month cost reduction.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
              <p className="text-sm font-medium text-purple-800">Free Tier Adjustments</p>
              <p className="text-xs text-purple-700 mt-1">
                Current Free tier operates at $0.05/user loss. Reducing points by 20% would improve unit economics without significant impact on conversion.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface MetricsCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
}

function MetricsCard({ title, value, change, changeLabel }: MetricsCardProps) {
  const isPositive = change > 0;
  const changeColor = title.includes("Cost") ? 
    (isPositive ? "text-dashboard-danger" : "text-dashboard-success") : 
    (isPositive ? "text-dashboard-success" : "text-dashboard-danger");
  
  return (
    <Card className="p-5 dashboard-card">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <p className={`text-xs ${changeColor} mt-2 flex items-center`}>
        <span>{isPositive ? '+' : ''}{change}%</span>
        <span className="text-gray-500 ml-1">{changeLabel}</span>
      </p>
    </Card>
  );
}
