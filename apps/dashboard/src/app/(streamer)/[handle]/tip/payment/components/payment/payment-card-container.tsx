import { Button } from '@/components/ui/button';
import { useState } from 'react';

export interface PaymentCardsContainerProps {
  total: string;
  children: React.ReactNode;
}
export default function PaymentCardsContainer(
  props: PaymentCardsContainerProps
) {
  return (
    <div className="relative pb-5  max-w-full h-fit w-[1000px] mt-10 px-5">
      <div className=" flex flex-col justify-start sm:flex-row sm:items-center sm:justify-between w-full sm:h-11 h-14 ">
        <h1 className="text-sm text-left font-normal text-slate-100 ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="rgb(241 245 249 / var(--tw-text-opacity))"
            className="inline mr-1 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
          Choose Your Payment Method
        </h1>
        <h1 className="text-base text-start font-normal text-slate-100 ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="rgb(241 245 249 / var(--tw-text-opacity))"
            className="inline mr-1 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
          {props.total} Ks
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 justify-center items-center m-6">
        {props.children}
      </div>
    </div>
  );
}
