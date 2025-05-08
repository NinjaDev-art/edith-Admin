
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Search, ArrowUpRight, BarChart2, Users } from "lucide-react";
import { userData, dailyUsage } from "@/utils/mockData";

export function UserAnalytics() {
  const topUsers = [...userData].sort((a, b) => b.pointsUsed - a.pointsUsed).slice(0, 5);
  
  // Calculate aggregate data by plan
  const planData = [
    { name: "Free", users: 2450, totalPoints: 157500000, avgPoints: 64285, retention: 62 },
    { name: "Pro", users: 1280, totalPoints: 1250000000, avgPoints: 976562, retention: 84 },
    { name: "Power Pro", users: 385, totalPoints: 1450000000, avgPoints: 3766234, retention: 91 }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Analytics</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search users..." 
              className="pl-9 w-64"
            />
          </div>
          <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90">Export Data</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStatsCard
          icon={Users}
          title="Total Users"
          value="4,115"
          change={12.4}
          bgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
        <QuickStatsCard
          icon={BarChart2}
          title="Avg. Usage"
          value="695k pts"
          change={8.7}
          bgColor="bg-purple-50"
          iconColor="text-purple-500"
        />
        <QuickStatsCard
          icon={Users}
          title="Free Users"
          value="2,450"
          change={15.3}
          bgColor="bg-green-50"
          iconColor="text-green-500"
        />
        <QuickStatsCard
          icon={Users}
          title="Paid Users"
          value="1,665"
          change={9.2}
          bgColor="bg-amber-50"
          iconColor="text-amber-500"
        />
      </div>

      {/* Top Users Table */}
      <Card className="p-5 dashboard-card">
        <h3 className="font-medium text-base mb-4">High Usage Users</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Points Used</TableHead>
              <TableHead>% of Quota</TableHead>
              <TableHead>Favorite Model</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    user.plan === 'Power Pro' ? 'bg-purple-100 text-purple-800' :
                    user.plan === 'Pro' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.plan}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{(user.pointsUsed / 1000).toFixed(0)}k</div>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div 
                      className={`h-2.5 rounded-full ${
                        user.percentageUsed > 90 ? 'bg-dashboard-danger' : 
                        user.percentageUsed > 70 ? 'bg-dashboard-warning' : 
                        'bg-dashboard-success'
                      }`} 
                      style={{ width: `${user.percentageUsed}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">{user.percentageUsed}%</div>
                </TableCell>
                <TableCell>{user.favoriteModel}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'warning' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card className="p-5 dashboard-card">
          <h3 className="font-medium text-base mb-4">User Growth</h3>
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
                  tickFormatter={(value) => value.split(" ")[1]} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  domain={[3500, 'dataMax + 500']}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="userCount" 
                  stroke="#6233EA" 
                  strokeWidth={2} 
                  dot={false}
                  name="Active Users" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Plans Comparison */}
        <Card className="p-5 dashboard-card">
          <h3 className="font-medium text-base mb-4">Plan Comparison</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={planData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  yAxisId="left"
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                />
                <Tooltip formatter={(value: number, name) => {
                  if (name === "Avg Points") return [`${(value/1000).toFixed(0)}k`, name];
                  if (name === "Retention") return [`${value}%`, name];
                  return [value.toLocaleString(), name];
                }} />
                <Bar dataKey="avgPoints" yAxisId="left" name="Avg Points" fill="#3FB6C4" />
                <Bar dataKey="retention" yAxisId="right" name="Retention" fill="#9B87F5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* User Segments */}
      <Card className="p-5 dashboard-card">
        <h3 className="font-medium text-base mb-4">User Segments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planData.map((plan) => (
            <div key={plan.name} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.name === 'Power Pro' ? 'bg-purple-100 text-purple-800' :
                  plan.name === 'Pro' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {plan.name}
                </span>
                <span className="text-xs text-gray-500">{plan.retention}% retention</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Users:</span>
                <span className="font-medium">{plan.users.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Total Points:</span>
                <span className="font-medium">{(plan.totalPoints / 1000000).toFixed(0)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Points:</span>
                <span className="font-medium">{(plan.avgPoints / 1000).toFixed(0)}k</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

interface QuickStatsCardProps {
  icon: any;
  title: string;
  value: string | number;
  change: number;
  bgColor: string;
  iconColor: string;
}

function QuickStatsCard({ icon: Icon, title, value, change, bgColor, iconColor }: QuickStatsCardProps) {
  return (
    <Card className="p-5 dashboard-card">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
          <div className="flex items-center mt-1">
            <span className="text-xl font-semibold">{value}</span>
            <div className="flex items-center ml-2 text-dashboard-success">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-xs font-medium">{change}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
