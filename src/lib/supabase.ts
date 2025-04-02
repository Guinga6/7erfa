
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for the orders table in Supabase
export interface OrderRecord {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  customer_city: string;
  customer_zip: string;
  customer_country: string;
  customer_phone: string;
  order_items: any; // Will store the cart items as JSON
  order_total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at?: string;
}

// Function to save an order to Supabase
export const saveOrder = async (orderData: OrderRecord) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();
  
  if (error) {
    console.error('Error saving order:', error);
    throw error;
  }
  
  return data?.[0];
};

// Function to get all orders
export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
  
  return data;
};
