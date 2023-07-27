'use client';
import HomeSectionOne from '@/components/home';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <HomeSectionOne />
      </div>
    </main>
  );
}
