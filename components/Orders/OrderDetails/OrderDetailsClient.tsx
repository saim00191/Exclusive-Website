"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Wrapper from "@/shared/Wrapper";
import { OrderData } from "@/components/Orders/OrderDetails/types";
import OrderDetails from "@/components/Orders/OrderDetails/OrderDetails";
import ProductList from "@/components/Orders/OrderDetails/ProductDetails";
import OrderSummary from "@/components/Orders/OrderDetails/OrderSummary";

interface OrderPageClientProps {
  initialData: OrderData | null;
  slug: string;
}

export default function OrderPageClient({ initialData, slug }: OrderPageClientProps) {
  const [data] = useState<OrderData | null>(initialData);
  const [formattedShippingDate, setFormattedShippingDate] = useState<string | null>(null);
  const [formattedOrderDate, setFormattedOrderDate] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setFormattedOrderDate(new Date(data.orderDate).toLocaleDateString("en-GB"));
      setFormattedShippingDate(
        data.shippingDate
          ? new Date(data.shippingDate).toLocaleDateString("en-GB")
          : new Date(new Date(data.orderDate).getTime() + 8 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB"),
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
        <OrderDetails
          slug={slug}
          firstName={data.firstName}
          formattedOrderDate={formattedOrderDate}
          formattedShippingDate={formattedShippingDate}
        />
        <p className="text-[18px] text-black font-medium mt-4">No products found in this order.</p>
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
      <OrderDetails
        slug={slug}
        firstName={data.firstName}
        formattedOrderDate={formattedOrderDate}
        formattedShippingDate={formattedShippingDate}
      />
      <ProductList products={data.products} />
      <OrderSummary data={data} />
    </Wrapper>
  );
}
