import { Suspense } from "react";
import EditOrderClient from "@/components/Orders/EditOrder/EditOrderClient";
import LoadingSpinner from "@/shared/LoadingSpinner";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Poppins } from "next/font/google";

interface EditOrderProps {
  params: Promise<{ slug: string }>;
}

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })


export default async function EditOrder({ params }: EditOrderProps) {
  const { slug } = await params;

  const order = await client.fetch(
    `*[_type == "order" && orderId == $slug][0]`,
    { slug }
  );

  if (!order) {
    return (
      <p className="text-center font-semibold uppercase text-red-500 py-6">
        Order not found.
      </p>
    );
  }

  const orderDate = new Date(order.orderDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - orderDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  if (daysDifference > 3) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-center font-semibold uppercase text-[18px] px-2 text-red-500 py-6">
          This order is too old to be edited.
        </p>

        <Link
          href="/"
          className={`${poppins.className} mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EditOrderClient slug={slug} />
    </Suspense>
  );
}
