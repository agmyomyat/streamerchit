import { Card } from '@/components/ui/card';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { cn } from '@/utils';
import { HumanizeDate } from '@/utils/humanize-date';
import { AppRouter } from '@streamer-achit/api';
import { inferRouterOutputs } from '@trpc/server';

type PayoutHistoryData =
  inferRouterOutputs<AppRouter>['user']['payout']['list'];

interface PayoutHistoryTableProps {
  data?: PayoutHistoryData;
}
export function PayoutHistoryTable(props: PayoutHistoryTableProps) {
  return (
    <Card className="w-full min-h-[600px] h-fit">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!props.data?.length ? (
            <TableRow>
              <TableCell className="font-medium"></TableCell>
            </TableRow>
          ) : (
            props.data.map((item, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {item.payout_uid}
                  </TableCell>
                  <TableCell className="text-xs truncate">
                    {HumanizeDate(item.createdAt)}
                  </TableCell>
                  <TableCell>{item.bank_type}</TableCell>
                  <TableCell className="text-xs truncate">
                    {item.bank_account_number}
                  </TableCell>
                  <TableCell className="whitespace-break-spaces text-xs">
                    {item.status}
                  </TableCell>
                  <TableCell className="">{item.amount}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <div
        className={cn('w-full flex justify-center', {
          hidden: props.data?.length,
        })}
      >
        No History Available
      </div>
    </Card>
  );
}
