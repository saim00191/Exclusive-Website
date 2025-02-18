import { Suspense } from 'react';
import EditOrderClient from '@/components/Orders/EditOrder/EditOrderClient';
import LoadingSpinner from "@/shared/LoadingSpinner";

interface EditOrderProps {
  params: {
    slug: string;
  };
}

export default async function EditOrder({ params }: EditOrderProps) {
  
  const {slug} = await params;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EditOrderClient slug={slug} />
    </Suspense>
  );
}

