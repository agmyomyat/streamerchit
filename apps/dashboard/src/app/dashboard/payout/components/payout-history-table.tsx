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
    <Card className="w-full h-[600px] max-h-full">
      <Table>
        <TableCaption className={cn({ hidden: !props.data?.length })}>
          A list of your recent tip history.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Bank Name</TableHead>
            <TableHead>Status</TableHead>
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
                    {item.payout_uid}
                  </TableCell>
                  <TableCell className="text-xs truncate">
                    {HumanizeDate(item.createdAt as unknown as Date)}{' '}
                  </TableCell>
                  <TableCell>{item.bank_type}</TableCell>
                  <TableCell className="whitespace-break-spaces text-xs">
                    {item.status}
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
