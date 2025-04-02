
import React, { useEffect, useState } from 'react';
import { getOrders, OrderRecord } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Orders = () => {
  const navigate = useNavigate();
  
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container-custom flex-grow pt-28 pb-20">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-7erfa-gray-600 hover:text-7erfa-black transition-colors duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </button>
        </div>

        <h1 className="text-2xl font-bold text-7erfa-black mb-6">Customer Orders</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-7erfa-black"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>Error loading orders. Please try again later.</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>List of all customer orders</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: OrderRecord) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id?.substring(0, 8)}</TableCell>
                    <TableCell>
                      {order.customer_name}<br />
                      <span className="text-sm text-gray-500">{order.customer_email}</span>
                    </TableCell>
                    <TableCell>{order.created_at ? formatDate(order.created_at) : 'N/A'}</TableCell>
                    <TableCell>${order.order_total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No orders found.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
