
import { supabase } from "@/integrations/supabase/client";

// Models related services
export const fetchModels = async () => {
  const { data, error } = await supabase
    .from("models")
    .select("*")
    .order("name");
  
  if (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
  
  return data;
};

export const updateModel = async (id: number, updates: any) => {
  const { data, error } = await supabase
    .from("models")
    .update(updates)
    .eq("id", id)
    .select();
  
  if (error) {
    console.error("Error updating model:", error);
    throw error;
  }
  
  return data;
};

// Plans related services
export const fetchPlans = async () => {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("price");
  
  if (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
  
  return data;
};

export const updatePlan = async (id: number, updates: any) => {
  const { data, error } = await supabase
    .from("plans")
    .update(updates)
    .eq("id", id)
    .select();
  
  if (error) {
    console.error("Error updating plan:", error);
    throw error;
  }
  
  return data;
};

// Users related services
export const fetchUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*, plans(name)")
    .order("join_date", { ascending: false });
  
  if (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
  
  return data;
};

// Usage logs related services
export const fetchUsageLogs = async () => {
  const { data, error } = await supabase
    .from("usage_logs")
    .select("*, users(name, email), models(name)")
    .order("date", { ascending: false })
    .limit(100);
  
  if (error) {
    console.error("Error fetching usage logs:", error);
    throw error;
  }
  
  return data;
};

// Daily stats related services
export const fetchDailyStats = async () => {
  const { data, error } = await supabase
    .from("daily_stats")
    .select("*")
    .order("date", { ascending: false })
    .limit(30);
  
  if (error) {
    console.error("Error fetching daily stats:", error);
    throw error;
  }
  
  return data;
};

// Monthly revenue related services
export const fetchMonthlyRevenue = async () => {
  const { data, error } = await supabase
    .from("monthly_revenue")
    .select("*")
    .order("month", { ascending: false })
    .limit(12);
  
  if (error) {
    console.error("Error fetching monthly revenue:", error);
    throw error;
  }
  
  return data;
};
