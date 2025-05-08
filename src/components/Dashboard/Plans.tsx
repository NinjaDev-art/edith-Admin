
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Check, Info } from "lucide-react";
import { plansData } from "@/utils/mockData";

export function Plans() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Plans Management</h2>
        <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Create New Plan
        </Button>
      </div>
      
      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plansData.map((plan) => (
          <Card key={plan.id} className="relative overflow-hidden dashboard-card">
            {plan.name === 'Pro' && (
              <div className="absolute top-0 right-0 bg-dashboard-primary text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                MOST POPULAR
              </div>
            )}
            
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="text-gray-500 ml-1">/mo</span>}
              </div>
              <p className="text-sm text-gray-500 mt-2">{plan.targetSegment}</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-dashboard-success mr-3 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>{(plan.pointsPerMonth / 1000000).toFixed(1)}M</strong> compute points/month
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-dashboard-success mr-3 flex-shrink-0" />
                  <span className="text-sm">{plan.usageLogic}</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 text-dashboard-success mr-3 flex-shrink-0" />
                  {plan.name === 'Free' ? (
                    <span>Limited model access</span>
                  ) : plan.name === 'Pro' ? (
                    <span>Access to all models</span>
                  ) : (
                    <span>Priority access & API metering</span>
                  )}
                </li>
                {plan.name !== 'Free' && (
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-dashboard-success mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>+{plan.name === 'Pro' ? '10' : '15'}%</strong> bonus points with yearly billing
                    </span>
                  </li>
                )}
              </ul>
              
              <div className="mt-5 pt-5 border-t">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Active Users:</span>
                  <span className="text-sm">{plan.userCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Retention:</span>
                  <span className="text-sm">{plan.retention}%</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-5">
                <Edit className="h-4 w-4 mr-2" /> Edit Plan
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Plan Details Table */}
      <Card className="p-5 dashboard-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-base">Plan Performance</h3>
          <select className="text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1">
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead className="text-right">Users</TableHead>
              <TableHead className="text-right">Avg Revenue</TableHead>
              <TableHead className="text-right">Avg Cost</TableHead>
              <TableHead className="text-right">Profit Margin</TableHead>
              <TableHead className="text-right">Retention</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plansData.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell className="text-right">{plan.userCount.toLocaleString()}</TableCell>
                <TableCell className="text-right">${plan.revenue.toFixed(2)}</TableCell>
                <TableCell className="text-right">${plan.avgCost.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plan.profit < 0 ? 'bg-red-100 text-red-800' : 
                    plan.profit < 10 ? 'bg-amber-100 text-amber-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {plan.profit < 0 ? '-' : '+'}${Math.abs(plan.profit).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-right">{plan.retention}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {/* Plan Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 dashboard-card">
          <h3 className="font-medium text-base mb-4">Plan Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Daily Throttle Settings</label>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Free Plan" className="h-10" defaultValue="10000" />
                <Input placeholder="Pro Plan" className="h-10" defaultValue="200000" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Set daily maximum point usage (0 for no limit)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usage Warnings</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Warning At</label>
                  <div className="relative">
                    <Input defaultValue="75" className="h-10 pr-8" />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Critical At</label>
                  <div className="relative">
                    <Input defaultValue="90" className="h-10 pr-8" />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yearly Plan Bonuses</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input defaultValue="10" className="h-10 pr-8" />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                </div>
                <div className="relative">
                  <Input defaultValue="15" className="h-10 pr-8" />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Bonus points for Pro and Power Pro yearly plans</p>
            </div>
            
            <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90 mt-2">
              Save Configuration
            </Button>
          </div>
        </Card>
        
        <Card className="p-5 dashboard-card">
          <h3 className="font-medium text-base mb-4">Model Access Control</h3>
          <div className="space-y-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2 font-medium">Model</th>
                  <th className="text-center pb-2 font-medium">Free</th>
                  <th className="text-center pb-2 font-medium">Pro</th>
                  <th className="text-center pb-2 font-medium">Power Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">GPT-4 Turbo</td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Claude 3 Sonnet</td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Claude 3 Opus</td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 flex items-center">
                    <span>Grok</span>
                    <Info className="h-4 w-4 text-amber-500 ml-1" />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" />
                  </td>
                  <td className="text-center py-3">
                    <input type="checkbox" className="h-4 w-4 accent-dashboard-primary" checked readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="flex bg-amber-50 border border-amber-200 rounded-md p-3">
              <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                Grok has a high point burn rate (200pts/1K tokens). Consider limiting access to Power Pro users only.
              </p>
            </div>
            
            <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90 mt-2">
              Save Access Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
