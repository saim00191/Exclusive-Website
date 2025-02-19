import { Suspense } from 'react';
import { client } from "@/sanity/lib/client";
import CancelledPageClient from '@/components/CancelledOrder/CancelledDetails/CancelledOrdersClient';
import LoadingSpinner from "@/shared/LoadingSpinner";
import { OrderData } from "@/components/Orders/OrderDetails/types";

interface CancelledPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrderPage({ params }: CancelledPageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CancelledPageClient initialData={data} slug={slug} />
    </Suspense>
  );
}

async function getData(slug: string): Promise<OrderData | null> {
  try {
    const response = await client.fetch(
      `*[_type == "cancelOrder" && orderId == $slug] {
        _id,
        orderId,
        userLoginName,
        userLoginEmail,
        firstName,
        company,
        address,
        city,
        phone,
        email,
        products[] {
          _key,
          productId,
          productImage {
            _type,
            asset {
              _ref
            }
          },
          productName,
          quantity,
          price,
          totalPrice
        },
        totalAmount,
        orderStatus,
        paymentStatus,
        orderDate,
        cancelledAt,
      }`,
      { slug },
    );
    return response[0] || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}