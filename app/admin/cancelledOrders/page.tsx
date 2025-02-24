"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import { client } from "@/sanity/lib/client";
import LoadingSpinner from "@/shared/LoadingSpinner";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export interface Product {
  productId: string;
  productImage?: { asset: { _ref: string } };
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  firstName?: string;
  userLoginEmail?: string;
  userLoginPassword?: string;
  phone?: string;
  cancelledAt?: string;
  email?: string;
  city?: string;
  company?: string;
  address?: string;
  products: Product[];
  totalAmount: number;
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  orderDate: string;
}

export default function CancelleedOrderPage() {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const Orders: Order[] = await client.fetch(
          `*[_type == "cancelOrder"]{
            orderId,
            firstName,
            email,
            userLoginEmail,
            totalAmount,
            phone,
            city,
            address,
            company,
            userLoginPassword,
            orderStatus,
            paymentStatus,
            orderDate,
            cancelledAt,
            products[]{
              productId,
              productImage,
              productName,
              quantity,
              price,
              totalPrice
            }
          }`
        );
        setOrderData(Orders);
        console.log("Orders", Orders);
      } catch (error) {
        console.error("Error fetching Orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOrder]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`${poppins.className} py-10 px-4 sm:px-6 lg:px-8 ${selectedOrder ? "pointer-events-none" : ""}`}
    >
      <h1 className="font-bold mb-6 text-[28px] sm:text-[36px] tracking-[4px] text-black ">
        Cancelled Orders
      </h1>
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-carminePink text-white border-b ">
              <th className="px-2 sm:px-4 py-2 text-left">Order ID</th>
              <th className="px-2 sm:px-4 py-2 text-start hidden sm:table-cell">
                User Name
              </th>
              <th className="px-2 sm:px-4 py-2 text-start hidden md:table-cell">
                Order Date
              </th>
              <th className="px-2 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <motion.tr
                key={order.orderId}
                className="border-b hover:bg-gray-50 "
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-2 sm:px-4 py-2 font-medium">
                  {order.orderId}
                </td>
                <td className="px-2 sm:px-4 py-2   text-start hidden sm:table-cell">
                  {order.firstName}
                </td>
                <td className="px-2 sm:px-4 py-2 text-start hidden md:table-cell">
                  {new Date(order.orderDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-2 sm:px-4 py-2 flex items-center justify-center">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg pointer-events-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-lg sm:text-xl font-bold mb-3">
                Order Details: {selectedOrder.orderId}
              </h2>
              <p>Customer: {selectedOrder.firstName}</p>
              <p>LoggedIn Email: {selectedOrder.userLoginEmail}</p>
              {selectedOrder.userLoginPassword && (
                <p>LoggedIn Password: {selectedOrder.userLoginPassword}</p>
              )}
              <p>Customer: {selectedOrder.firstName}</p>
              <p>Email: {selectedOrder.email}</p>
              <p>Phone: {selectedOrder.phone}</p>
              <p>City: {selectedOrder.city}</p>
              {selectedOrder.company && <p>City: {selectedOrder.city}</p>}
              <p>Address: {selectedOrder.address}</p>
              <p>Status: {selectedOrder.orderStatus}</p>
              <p>Payment Status: {selectedOrder.paymentStatus}</p>
              <p>Payment Method: Cash on Delivery</p>
              <p>
                Order Date:{" "}
                {new Date(selectedOrder.orderDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>
                Cancelled Date :
                {selectedOrder.cancelledAt
                  ? new Date(selectedOrder.cancelledAt).toLocaleString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )
                  : "N/A"}
              </p>
              <p>Total: ${selectedOrder.totalAmount}</p>
              <h3 className="font-semibold mt-4">Products:</h3>
              <ul className="h-[250px] overflow-y-scroll">
                {selectedOrder.products.map((product) => (
                  <li
                    key={product.productId}
                    className="flex items-center gap-3 text-sm mt-2 "
                  >
                    {product.productImage?.asset?._ref ? (
                      <Image
                        src={
                          urlFor(product.productImage).url() ||
                          "/placeholder.svg"
                        }
                        alt={product.productName}
                        className="w-[40px] h-[40px] object-cover "
                        width={40}
                        height={40}
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                        <p>No Image</p>
                      </div>
                    )}
                    <span>
                      {product.productName} - Quantity:{" "}
                      <b>{product.quantity}</b> -{" "}
                      <b>${product.price.toFixed(2)}</b>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
