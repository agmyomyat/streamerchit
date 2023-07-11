'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useTipPageContext } from '../../providers/tip-page-provider';
interface DonationCardProps {
  children: React.ReactNode;
}
export function DonationCard({ children }: DonationCardProps) {
  const { streamer } = useTipPageContext();
  return (
    <Card className="w-[450px]">
      <CardHeader>
        {/* <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        <Avatar className="flex justify-center">
          <AvatarImage
            src={streamer.image}
            className="rounded-full w-16 h-16"
          />
          <AvatarFallback>{streamer.name.split('')[0] || 'S'}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button>Donate</Button>
      </CardFooter> */}
    </Card>
  );
}
