"use client";

import { client } from "@/sanity/lib/client";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <p className="font-medium text-gray-900">{`${label}`}</p>
        <p className="text-gray-700">Date: {payload[0].payload.fullDate}</p>
        <p className="text-emerald-600 font-bold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
  const [salesData, setSalesData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const fetchOrders = async () => {
      try {
        const orders = await client.fetch(`*[_type == "order"]`);
        console.log("Total Orders:", orders.length);
        setOrderCount(orders.length);

        const formattedData = orders
          .map((order: { orderDate: string; totalAmount: number }) => {
            const dateObj = new Date(order.orderDate);
            return {
              month: dateObj.toLocaleString("default", {
          month: "short",
              }),
              fullDate: `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`,
              sales: order.totalAmount,
              timestamp: dateObj.getTime(),
            };
          })
          .sort((a: { timestamp: number; }, b: { timestamp: number; }) => a.timestamp - b.timestamp); // Sort by timestamp

        console.log("Formatted & Sorted Data:", formattedData);
        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`${poppins.className} w-full bg-white mt-4 rounded-xl shadow-lg p-4 md:p-6`}
    >
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Order Sales
        </h2>
        <p className="text-sm text-gray-500">Monthly sales performance</p>
        <p className="text-sm text-gray-700 font-semibold mt-2">
          Total Orders: {orderCount}
        </p>
      </div>

      <div className="h-[300px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-gray-700">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorSales)"
              strokeWidth={2}
              activeDot={{
                r: 6,
                stroke: "#10b981",
                strokeWidth: 2,
                fill: "white",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
