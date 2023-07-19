'use client';
import { trpcReact } from '@/lib/trpc/trpc-react';
import { TipInfoCard } from './components/tip-info-card';
import { useState, useEffect, useMemo } from 'react';
import { useEventSource } from '@/hooks/use-event-source';
import { useSession } from 'next-auth/react';
import { observer } from '@legendapp/state/react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Page() {
  const session = useSession();
  const [forceUpdateKey, setForceUpdateKey] = useState(0);
  const serverEventUrl = useMemo(() => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const user_id = session.data?.user?.id;
    if (!user_id || !backend_url) return null;
    return `${backend_url}/v1/alertbox/sse/donation/${user_id}`;
  }, [session.data?.user?.id]);
  const { eventData } = useEventSource(serverEventUrl);
  // force  rerender every 10 seconds to check tipinfoCard is still new or not
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdateKey((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Card
      key={forceUpdateKey}
      className="w-full flex flex-col gap-5 min-h-[700px] h-full"
    >
      <CardHeader>
        <CardTitle>Tip Activities</CardTitle>
        <CardDescription>Capture live donation here</CardDescription>
      </CardHeader>
      <div className="flex flex-col items-center mx-10">
        {!eventData?.length ? (
          <div className="w-full flex justify-center">
            <h1>Waiting for new donation....</h1>
          </div>
        ) : (
          eventData.map((item, idx) => {
            return (
              <div key={idx} className="w-full ">
                <TipInfoCard
                  amount={item.amount}
                  doner={item.name}
                  date={item.date}
                  message={item.message}
                />
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
//testing purpose
//   const [tipInfoCards, setTipInfoCards] = useState<
//     {
//       doner: string;
//       message: string;
//       amount: number;
//       date: Date;
//     }[]
//   >([]);

{
  /* testing purpose */
}
{
  /* {tipInfoCards?.map((item, idx) => {
  return (
    <div key={idx}>
      <TipInfoCard
        amount={item.amount}
        doner={item.doner}
        date={item.date}
        message={item.message}
      />
    </div>
  );
})} */
}
const tipInfoCards = [
  {
    doner: 'John Doe',
    message: 'Thanks for everything!',
    amount: 25.5,
    date: new Date(),
  },
  {
    doner: 'Jane Smith',
    message: "You're awesome!",
    amount: 15.75,
    date: new Date(),
  },
  {
    doner: 'Michael Johnson',
    message: 'Keep up the great work!',
    amount: 50.0,
    date: new Date('2023-07-03'),
  },
  {
    doner: 'Emily Anderson',
    message: 'Sending support your way!',
    amount: 10.0,
    date: new Date('2023-07-04'),
  },
  {
    doner: 'David Lee',
    message: 'You deserve it!',
    amount: 30.25,
    date: new Date('2023-07-05'),
  },
  {
    doner: 'Sophia Martinez',
    message: 'Thanks for your hard work!',
    amount: 20.5,
    date: new Date('2023-07-06'),
  },
  {
    doner: 'James Wilson',
    message: 'Keep making a difference!',
    amount: 100.0,
    date: new Date('2023-07-07'),
  },
  {
    doner: 'Olivia Thomas',
    message: "You're an inspiration!",
    amount: 40.0,
    date: new Date('2023-07-08'),
  },
  {
    doner: 'Liam Garcia',
    message: 'Great job!',
    amount: 12.75,
    date: new Date('2023-07-09'),
  },
  {
    doner: 'Ava Rodriguez',
    message: 'Wishing you the best!',
    amount: 60.5,
    date: new Date('2023-07-10'),
  },
];
/** for testing purpose  */
//   useEffect(() => {
//     // Simulate new data coming in every 10 seconds (replace this with your data fetching logic)
//     const interval = setInterval(() => {
//       const mockData = generateMockData(); // Replace this with your function to fetch new data
//       setTipInfoCards((prev) => [...prev, ...mockData]);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Replace this with your function to generate or fetch new data
//   const generateMockData = () => {
//     // Generate a new array of mock data
//     // For simplicity, we'll reuse the mock data from the previous example
//     // You can replace this with your own logic to fetch or generate new data
//     return [
//       {
//         doner: 'John Doe',
//         message: 'Thanks for everything!',
//         amount: 25.5,
//         date: new Date(),
//       },
//       // Add more mock data objects here...
//     ];
//   };
