"use client"

import { motion } from "framer-motion"
import type { Order } from "./types"

interface OrderTableProps {
  orderData: Order[]
  onViewDetails: (order: Order) => void
}

export default function OrderTable({ orderData, onViewDetails }: OrderTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-carminePink text-white border-b">
            <th className="px-2 sm:px-4 py-2 text-left">Order ID</th>
            <th className="px-2 sm:px-4 py-2 text-start hidden sm:table-cell">User Name</th>
            <th className="px-2 sm:px-4 py-2 text-start hidden md:table-cell">Order Date</th>
            <th className="px-2 sm:px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <motion.tr
              key={order.orderId}
              className="border-b hover:bg-gray-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <td className="px-2 sm:px-4 py-2 font-medium">{order.orderId}</td>
              <td className="px-2 sm:px-4 py-2 text-start hidden sm:table-cell">{order.firstName}</td>
              <td className="px-2 sm:px-4 py-2 text-start hidden md:table-cell">
                {new Date(order.orderDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="px-2 sm:px-4 py-2 flex items-center justify-center">
                <button className="text-sm text-blue-600 hover:underline" onClick={() => onViewDetails(order)}>
                  View Details
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

