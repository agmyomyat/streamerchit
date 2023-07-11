'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Page({ params }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${params.handle}/tip`);
  }, []);
  return <div>Payment</div>;
}
