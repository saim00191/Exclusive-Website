"use client";

import { Dialog } from "@headlessui/react";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

interface Product {
  productId: string;
  productImage: {
    _type: string;
    asset: { _ref: string } | string;
  };
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface OrderDetails {
  orderId: string;
  userLoginName: string;
  userLoginEmail: string;
  firstName: string;
  address: string;
  city: string;
  phone: number | string;
  email: string;
  products: Product[];
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  orderDate: string;
  shippingDate: string | null;
}

interface ReactivateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderDetails: OrderDetails;
}

export function ReactivateOrderModal({ isOpen, onClose, onConfirm, orderDetails }: ReactivateOrderModalProps) {
  const userInfo = useSelector((state: RootState) => state.products.userInfo);
  const [isReactivating, setIsReactivating] = useState(false);
  const router = useRouter();
  const [countdown, setCountdown] = useState(4);

  const sendReactivateOrderToSanity = async () => {
    setIsReactivating(true);
    try {
      // First, check the cancelOrder collection for the original order
      const cancelOrderQuery = `*[_type == "cancelOrder" && orderId == $orderId][0]`;
      const cancelOrderParams = { orderId: orderDetails.orderId };
      const cancelledOrder = await client.fetch(cancelOrderQuery, cancelOrderParams);
  
      if (!cancelledOrder) {
        throw new Error(`Cancelled order with ID ${orderDetails.orderId} not found`);
      }
  
      // Query the original order
      const orderQuery = `*[_type == "order" && orderId == $orderId][0]`;
      const orderParams = { orderId: orderDetails.orderId };
      const existingOrder = await client.fetch(orderQuery, orderParams);
  
      let createdOrderId = null;
  
      if (!existingOrder) {
        console.log("Creating new order document as original was not found");
        // Create a new order document if the original is not found
        const createdOrder = await client.create({
          _type: "order",
          orderId: orderDetails.orderId,
          userLoginName: userInfo?.displayName || cancelledOrder.userLoginName,
          userLoginEmail: userInfo?.email || cancelledOrder.userLoginEmail,
          firstName: orderDetails.firstName,
          address: orderDetails.address,
          city: orderDetails.city,
          phone: orderDetails.phone,
          email: orderDetails.email,
          products: orderDetails.products,
          totalAmount: orderDetails.totalAmount,
          orderStatus: "pending",
          paymentStatus: "pending",
          orderDate: orderDetails.orderDate,
          reactivatedAt: new Date().toISOString(),
        });
  
        if (!createdOrder?._id) {
          throw new Error("Failed to create new order");
        }
  
        createdOrderId = createdOrder._id;
      } else {
        // Update the existing order
        await client
          .patch(existingOrder._id)
          .set({
            orderStatus: "pending",
            paymentStatus: "pending",
            reactivatedAt: new Date().toISOString(),
          })
          .commit();
      }
  
      // Create a reactivation record
      await client.create({
        _type: "reactivateOrder",
        orderId: orderDetails.orderId,
        userLoginName: userInfo?.displayName,
        userLoginEmail: userInfo?.email,
        firstName: orderDetails.firstName,
        address: orderDetails.address,
        city: orderDetails.city,
        phone: orderDetails.phone,
        email: orderDetails.email,
        products: orderDetails.products,
        totalAmount: orderDetails.totalAmount,
        orderStatus: "pending",
        paymentStatus: "pending",
        orderDate: orderDetails.orderDate,
        reactivatedAt: new Date().toISOString(),
        previousStatus: cancelledOrder.orderStatus,
        previousPaymentStatus: cancelledOrder.paymentStatus,
      });
  
      // Ensure cancelledOrder._id exists before deletion
      if (cancelledOrder._id) {
        setTimeout(async () => {
          try {
            await client.delete(cancelledOrder._id);
            console.log(`Successfully deleted cancelled order: ${cancelledOrder._id}`);
          } catch (deleteError) {
            console.error("Error deleting cancelled order:", deleteError);
          }
        }, 2000); // Small delay before deletion
      }
  
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount === 1) {
            clearInterval(timer);
            router.push("/");
          }
          return prevCount - 1;
        });
      }, 1000);
  
      onConfirm();
      onClose();
      toast.success("Order reactivated successfully.");
    } catch (error) {
      console.error("Error reactivating order:", error);
      toast.error("Failed to reactivate order. Please try again.");
    } finally {
      setIsReactivating(false);
    }
  };
  
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-sm rounded bg-white p-6 ${poppins.className}`}>
          <Dialog.Title className="text-lg font-medium mb-4">Reactivate Order</Dialog.Title>
          <p className="mb-4">
            Are you sure you want to <b>reactivate</b> this order?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
              disabled={isReactivating}
            >
              No
            </button>
            <button
              onClick={sendReactivateOrderToSanity}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isReactivating}
            >
              {isReactivating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Reactivating...
                </>
              ) : (
                "Yes, Reactivate"
              )}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
