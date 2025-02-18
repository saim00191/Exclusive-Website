import { Suspense } from 'react';
import EditOrderClient from '@/components/Orders/EditOrder/EditOrderClient';
import LoadingSpinner from "@/shared/LoadingSpinner";

export default function EditOrder({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EditOrderClient slug={params.slug} />
    </Suspense>
  );
}