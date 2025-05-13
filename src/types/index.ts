
// Model interface
export interface Model {
  id: number;
  name: string;
  input_cost: number;
  output_cost: number;
  estimated_usd: number;
  multiplier: number;
  point_burn: number;
  enabled: boolean;
  usage: number;
  daily_change: number;
  created_at: string;
  updated_at: string;
}

// Plan interface
export interface Plan {
  id: number;
  name: string;
  price: number;
  points_per_month: number;
  usage_logic: string;
  target_segment: string;
  user_count: number;
  revenue: number;
  avg_cost: number;
  profit: number;
  retention: number;
  created_at: string;
  updated_at: string;
}

// User interface
export interface User {
  id: string;
  name: string | null;
  email: string;
  plan_id: number | null;
  points_used: number;
  percentage_used: number;
  join_date: string;
  favorite_model: string | null;
  status: string;
  plans?: {
    name: string;
  };
  created_at: string;
  updated_at: string;
}

// Usage Log interface
export interface UsageLog {
  id: number;
  user_id: string | null;
  model_id: number | null;
  points_consumed: number;
  cost: number;
  date: string;
  users?: {
    name: string | null;
    email: string;
  };
  models?: {
    name: string;
  };
}

// Daily Stats interface
export interface DailyStat {
  id: number;
  date: string;
  total_points: number;
  avg_cost_per_point: number;
  user_count: number;
  free_usage: number;
  pro_usage: number;
  power_pro_usage: number;
  created_at: string;
}

// Monthly Revenue interface
export interface MonthlyRevenue {
  id: number;
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  created_at: string;
}
