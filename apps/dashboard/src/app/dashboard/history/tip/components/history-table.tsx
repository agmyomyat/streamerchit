'use client';
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { HumanizeDate } from '@/utils/humanize-date';
import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@streamer-achit/api';
import { cn } from '@/utils';
import { Card } from '@/components/ui/card';
type tipPageHistoryData =
  inferRouterOutputs<AppRouter>['user']['getDonationHistory'];
interface TipHistoryTableProps {
  data?: tipPageHistoryData;
}
export function TipHistoryTable(props: TipHistoryTableProps) {
  return (
    <Card className="w-full h-[600px] max-h-full">
      <Table>
        <TableCaption className={cn({ hidden: !props.data?.length })}>
          A list of your recent tip history.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!props.data?.length ? (
            <TableRow>
              <TableCell className="font-medium"></TableCell>
            </TableRow>
          ) : (
            props.data.map((item) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">
                    {item.payment_transaction.doner_name}
                  </TableCell>
                  <TableCell className="text-xs truncate">
                    {HumanizeDate(item.created_at as unknown as Date)}{' '}
                  </TableCell>
                  <TableCell>{item.payment_transaction.total_amount}</TableCell>
                  <TableCell className="whitespace-break-spaces text-xs">
                    {item.payment_transaction.memo}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <div className="w-full flex justify-center">No History Available</div>
    </Card>
  );
}
