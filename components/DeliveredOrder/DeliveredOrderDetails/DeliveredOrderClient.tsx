"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Wrapper from "@/shared/Wrapper";
import { OrderData } from "@/components/Orders/OrderDetails/types";
import DeliveredOrder from "./DeliveredOrder";
import ProductList from "./ProductsDetails";
import OrderSummary from "./DeliveredOrderSummary";

interface OrderPageClientProps {
  initialData: OrderData | null;
  slug: string;
}

export default function OrderPageClient({
  initialData,
  slug,
}: OrderPageClientProps) {
  const [data] = useState<OrderData | null>(initialData);
  const [formattedDeliveredDate, setFormattedDeliveredDate] = useState<
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
      setFormattedDeliveredDate(
        new Date(new Date(data.orderDate).setDate(new Date(data.orderDate).getDate() + 8))
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
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
        <DeliveredOrder
          slug={slug}
          firstName={data.firstName}
          formattedOrderDate={formattedOrderDate}
          formattedDeliveredDate={formattedDeliveredDate}
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
      <DeliveredOrder
        slug={slug}
        firstName={data.firstName}
        formattedOrderDate={formattedOrderDate}
        formattedDeliveredDate={formattedDeliveredDate}
      />
      <ProductList products={data.products} />
      <OrderSummary data={data} />
    </Wrapper>
  );
}
