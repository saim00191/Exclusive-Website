"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Wrapper from "@/shared/Wrapper";
import { OrderData } from "@/components/Orders/OrderDetails/types";
import CancelledOrder from "@/components/CancelledOrder/CancelledDetails/CancelledOrder";
import ProductList from "@/components/CancelledOrder/CancelledDetails/ProductDetails";
import OrderSummary from "@/components/CancelledOrder/CancelledDetails/CancelledOrderSummary";

interface OrderPageClientProps {
  initialData: OrderData | null;
  slug: string;
}

export default function OrderPageClient({
  initialData,
  slug,
}: OrderPageClientProps) {
  const [data] = useState<OrderData | null>(initialData);
  const [formattedCancelledDate, setFormattedCancelledDate] = useState<
    string | null
  >(null);
  const [formattedOrderDate, setFormattedOrderDate] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setFormattedOrderDate(
        new Date(data.orderDate).toLocaleDateString("en-GB")
      );
      setFormattedCancelledDate(
        new Date(data.cancelledAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }
  }, [data]);

  if (!data) {
    return (
      <div className="w-full h-full flex justify-center items-center col-span-full py-8">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500"></div>
      </div>
    );
  }

  if (data.products.length === 0) {
    return (
      <Wrapper className="px-4 py-10">
        <CancelledOrder
          slug={slug}
          firstName={data.firstName}
          formattedOrderDate={formattedOrderDate}
          formattedCancelledDate={formattedCancelledDate}
        />
        <p className="text-[18px] text-black font-medium mt-4">
          No products found in this order.
        </p>
        <Link
          href="/orders"
          className="w-[200px] h-[56px] py-4 flex items-center justify-center rounded-[4px] border border-carminePink text-black hover:text-white hover:bg-carminePink mt-4"
        >
          <p className="text-[16px]">Back to Orders</p>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="px-4 py-10">
      <CancelledOrder
        slug={slug}
        firstName={data.firstName}
        formattedOrderDate={formattedOrderDate}
        formattedCancelledDate={formattedCancelledDate}
      />
      <ProductList products={data.products} />
      <OrderSummary data={data} />
    </Wrapper>
  );
}
