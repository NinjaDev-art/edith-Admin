
import { subDays, format, startOfMonth, subMonths } from 'date-fns';

// Models pricing and multiplier data
export const modelsData = [
  { 
    id: 1,
    name: 'GPT-4 Turbo', 
    inputCost: 0.01, 
    outputCost: 0.03, 
    estimatedUSD: 0.04, 
    multiplier: 1.5, 
    pointBurn: 60,
    enabled: true,
    usage: 320450,
    dailyChange: 5.2,
  },
  { 
    id: 2,
    name: 'Claude 3 Sonnet', 
    inputCost: 0.003, 
    outputCost: 0.015, 
    estimatedUSD: 0.018, 
    multiplier: 1.2, 
    pointBurn: 21.6,
    enabled: true,
    usage: 542890,
    dailyChange: 12.8,
  },
  { 
    id: 3,
    name: 'Claude 3 Opus', 
    inputCost: 0.015, 
    outputCost: 0.075, 
    estimatedUSD: 0.09, 
    multiplier: 1.8, 
    pointBurn: 162,
    enabled: true,
    usage: 156780,
    dailyChange: -2.3,
  },
  { 
    id: 4,
    name: 'DeepSeek V3', 
    inputCost: 0.002, 
    outputCost: 0.002, 
    estimatedUSD: 0.002, 
    multiplier: 1.5, 
    pointBurn: 3,
    enabled: true,
    usage: 876540,
    dailyChange: 18.5,
  },
  { 
    id: 5,
    name: 'Mixtral (hosted)', 
    inputCost: 0.0014, 
    outputCost: 0.0014, 
    estimatedUSD: 0.0014, 
    multiplier: 2.0, 
    pointBurn: 2.8,
    enabled: true,
    usage: 456730,
    dailyChange: 3.6,
  },
  { 
    id: 6,
    name: 'Gemini 2.5 Pro', 
    inputCost: 0, 
    outputCost: 0, 
    estimatedUSD: 0, 
    multiplier: 0.5, 
    pointBurn: 0,
    enabled: true,
    usage: 678940,
    dailyChange: 24.1,
  },
  { 
    id: 7,
    name: 'LLaMA 3 (local)', 
    inputCost: 0.0003, 
    outputCost: 0.0003, 
    estimatedUSD: 0.0003, 
    multiplier: 1.0, 
    pointBurn: 0.3,
    enabled: true,
    usage: 789540,
    dailyChange: 8.7,
  },
  { 
    id: 8,
    name: 'Grok', 
    inputCost: 0.05, 
    outputCost: 0.05, 
    estimatedUSD: 0.10, 
    multiplier: 2.0, 
    pointBurn: 200,
    enabled: true,
    usage: 109870,
    dailyChange: -4.2,
  }
];

// Plans data
export const plansData = [
  {
    id: 1,
    name: 'Free',
    price: 0,
    pointsPerMonth: 100000,
    usageLogic: 'Soft throttle at max',
    targetSegment: 'Students, new users',
    userCount: 2450,
    revenue: 0,
    avgCost: 0.05,
    profit: -0.05,
    retention: 62
  },
  {
    id: 2,
    name: 'Pro',
    price: 20,
    pointsPerMonth: 2000000,
    usageLogic: 'Fair usage up to cap',
    targetSegment: 'Power users, freelancers',
    userCount: 1280,
    revenue: 20,
    avgCost: 6,
    profit: 14,
    retention: 84
  },
  {
    id: 3,
    name: 'Power Pro',
    price: 50,
    pointsPerMonth: 6000000,
    usageLogic: 'Usage-based, limited refill',
    targetSegment: 'Agents/devs/LLM builders',
    userCount: 385,
    revenue: 50,
    avgCost: 17.5,
    profit: 32.5,
    retention: 91
  }
];

// Generate recent usage data for charts
export const generateDailyUsageData = () => {
  const data = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    
    data.push({
      date: format(date, 'MMM dd'),
      totalPoints: Math.floor(Math.random() * 500000) + 800000,
      avgCostPerPoint: (Math.random() * 0.0003) + 0.0008,
      userCount: Math.floor(Math.random() * 200) + 3900,
      freeUsage: Math.floor(Math.random() * 100000) + 80000,
      proUsage: Math.floor(Math.random() * 300000) + 500000,
      powerProUsage: Math.floor(Math.random() * 200000) + 300000,
    });
  }
  
  return data;
};

// Generate revenue data
export const generateRevenueData = () => {
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const monthName = format(date, 'MMM');
    
    const revenue = Math.floor(Math.random() * 15000) + 40000;
    const cost = Math.floor(Math.random() * 10000) + 15000;
    const profit = revenue - cost;
    const margin = (profit / revenue) * 100;
    
    data.push({
      month: monthName,
      revenue,
      cost,
      profit,
      margin
    });
  }
  
  return data;
};

// User data
export const generateUserData = () => {
  return [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      plan: 'Power Pro',
      pointsUsed: 4560000,
      percentageUsed: 76,
      joinDate: '2023-11-15',
      favoriteModel: 'GPT-4 Turbo',
      status: 'active'
    },
    {
      id: 2,
      name: 'Raj Patel',
      email: 'raj.p@example.com',
      plan: 'Pro',
      pointsUsed: 1820000,
      percentageUsed: 91,
      joinDate: '2024-01-22',
      favoriteModel: 'Claude 3 Sonnet',
      status: 'active'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      email: 'elena@example.com',
      plan: 'Free',
      pointsUsed: 97500,
      percentageUsed: 97.5,
      joinDate: '2024-03-08',
      favoriteModel: 'Mixtral',
      status: 'warning'
    },
    {
      id: 4,
      name: 'Jamal Washington',
      email: 'jamal.w@example.com',
      plan: 'Pro',
      pointsUsed: 980000,
      percentageUsed: 49,
      joinDate: '2023-09-30',
      favoriteModel: 'DeepSeek V3',
      status: 'active'
    },
    {
      id: 5,
      name: 'Olivia Kim',
      email: 'olivia.k@example.com',
      plan: 'Power Pro',
      pointsUsed: 5850000,
      percentageUsed: 97.5,
      joinDate: '2024-02-14',
      favoriteModel: 'Claude 3 Opus',
      status: 'warning'
    },
    {
      id: 6,
      name: 'Alex Chen',
      email: 'alex.c@example.com',
      plan: 'Free',
      pointsUsed: 62000,
      percentageUsed: 62,
      joinDate: '2024-04-05',
      favoriteModel: 'Gemini 2.5 Pro',
      status: 'active'
    },
  ];
};

// Dashboard overview stats
export const dashboardStats = {
  totalUsers: 4115,
  userGrowth: 12.4,
  totalRevenue: '$78,950',
  revenueGrowth: 8.7,
  totalPointsConsumed: '138.5M',
  pointsGrowth: 15.2,
  avgCostPerPoint: '$0.00083',
  costTrend: -2.1,
  profitMargin: '64.3%',
  marginTrend: 3.5
};

export const modelDistribution = [
  { name: 'GPT-4 Turbo', value: 22 },
  { name: 'Claude 3 Sonnet', value: 28 },
  { name: 'DeepSeek V3', value: 18 },
  { name: 'Mixtral', value: 12 },
  { name: 'Others', value: 20 }
];

export const planDistribution = [
  { name: 'Free', value: 60 },
  { name: 'Pro', value: 31 },
  { name: 'Power Pro', value: 9 }
];

// Daily usage data
export const dailyUsage = generateDailyUsageData();

// Revenue data
export const revenueData = generateRevenueData();

// User data
export const userData = generateUserData();
