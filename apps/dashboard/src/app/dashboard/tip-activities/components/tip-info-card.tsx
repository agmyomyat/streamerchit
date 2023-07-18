import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isDateOlderThan } from '@/utils/is-date-older-than-a-minute';
import { useEffect, useRef, useState } from 'react';
interface TipInfoCardProps {
  doner: string;
  message: string;
  amount: number;
  date: Date;
}
export function TipInfoCard({
  doner,
  message,
  amount,
  date,
}: TipInfoCardProps) {
  const isOld = isDateOlderThan(date, 1 * 1000 * 60);
  return (
    <Card className="max-w-[1200px] w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>
            <span className="text-blue-400">{doner}</span> Donated{' '}
            <span className="text-green-400 ">{amount}</span>
            <span> kyats</span>
          </div>
          {!isOld && (
            <div className="w-20 text-center bg-green-400 rounded-xl">new</div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
}
