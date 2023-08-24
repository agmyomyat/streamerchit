'use client';
import HomeSectionOne from '@/components/home';
import React from 'react';
import { HomeSectionTwo } from './components/section-two';
import { PaymentIntegrationSection } from './components/payment-integration-section';

export default function Home() {
  return (
    <main>
      <div className="w-full">
        <HomeSectionOne />
      </div>
      <div className="w-full pb-20">
        <HomeSectionTwo />
      </div>
      <div>
        <PaymentIntegrationSection />
      </div>
    </main>
  );
}
