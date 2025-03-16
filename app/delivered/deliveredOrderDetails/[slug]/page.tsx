import { Suspense } from 'react';
import { client } from "@/sanity/lib/client";
import DeliveredOrderClient from '@/components/DeliveredOrder/DeliveredOrderDetails/DeliveredOrderClient';
import LoadingSpinner from "@/shared/LoadingSpinner";
import { OrderData } from "@/components/Orders/OrderDetails/types";

interface DeliveredPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrderPage({ params }: DeliveredPageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DeliveredOrderClient initialData={data} slug={slug} />
    </Suspense>
  );
}

async function getData(slug: string): Promise<OrderData | null> {
  try {
    const response = await client.fetch(
      `*[_type == "delivered" && orderId == $slug] {
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
      }`,
      { slug },
    );
    return response[0] || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}