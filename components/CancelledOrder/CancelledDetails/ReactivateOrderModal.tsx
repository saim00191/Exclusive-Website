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

export function ReactivateOrderModal({
  isOpen,
  onClose,
  onConfirm,
  orderDetails,
}: ReactivateOrderModalProps) {
  const userInfo = useSelector((state: RootState) => state.products.userInfo);
  const [isReactivating, setIsReactivating] = useState(false);
  const router = useRouter();
  const [countdown, setCountdown] = useState(2);
  console.log(countdown);
  const sendReactivateOrderToSanity = async () => {
    setIsReactivating(true);

    try {
      const reactivatedOrderQuery = `*[_type == "reactivateOrder" && orderId == $orderId][0]`;
      const reactivatedOrderParams = { orderId: orderDetails.orderId };
      let existingReactivatedOrder;

      try {
        existingReactivatedOrder = await client.fetch(
          reactivatedOrderQuery,
          reactivatedOrderParams
        );
      } catch (error) {
        console.error(error);
      }

      const cancelOrderQuery = `*[_type == "cancelOrder" && orderId == $orderId][0]`;
      const cancelOrderParams = { orderId: orderDetails.orderId };
      let cancelledOrder;

      try {
        cancelledOrder = await client.fetch(
          cancelOrderQuery,
          cancelOrderParams
        );
      } catch (error) {
        console.error(error);
      }

      if (!cancelledOrder) {
        console.warn(
          `Cancelled order with ID ${orderDetails.orderId} not found. Proceeding with reactivation.`
        );
      }

      const orderQuery = `*[_type == "order" && orderId == $orderId][0]`;
      const orderParams = { orderId: orderDetails.orderId };
      let existingOrder;

      try {
        existingOrder = await client.fetch(orderQuery, orderParams);
      } catch (error) {
        console.error(error);
      }

      if (!existingOrder) {
        try {
          await client.create({
            _type: "order",
            orderId: orderDetails.orderId,
            userLoginName:
              userInfo?.displayName || cancelledOrder?.userLoginName,
            userLoginEmail: userInfo?.email || cancelledOrder?.userLoginEmail,
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
        } catch (error) {
          throw error;
        }
      } else {
        try {
          await client
            .patch(existingOrder._id)
            .set({
              orderStatus: "pending",
              paymentStatus: "pending",
              reactivatedAt: new Date().toISOString(),
            })
            .commit();
        } catch (error) {
          console.error(error);
          await client.create({
            _type: "order",
            ...existingOrder,
            _id: undefined,
            orderStatus: "pending",
            paymentStatus: "pending",
            reactivatedAt: new Date().toISOString(),
          });
        }
      }

      const reactivationData = {
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
        previousStatus: cancelledOrder?.orderStatus || "unknown",
        previousPaymentStatus: cancelledOrder?.paymentStatus || "unknown",
      };

      if (existingReactivatedOrder) {
        try {
          await client
            .patch(existingReactivatedOrder._id)
            .set(reactivationData)
            .commit();
        } catch (error) {
          console.log(error);
          // If patch fails, create new reactivation order
          await client.create({
            _type: "reactivateOrder",
            ...reactivationData,
          });
        }
      } else {
        try {
          await client.create({
            _type: "reactivateOrder",
            ...reactivationData,
          });
        } catch (error) {
          throw error;
        }
      }

      if (cancelledOrder?._id) {
        try {
          await client.delete(cancelledOrder._id);
        } catch (error) {
          console.error(error);
        }
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
        <Dialog.Panel
          className={`w-full max-w-sm rounded bg-white p-6 ${poppins.className}`}
        >
          <Dialog.Title className="text-lg font-medium mb-4">
            Reactivate Order
          </Dialog.Title>
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
