import { Button } from '@/components/ui/button';
import { useState } from 'react';
interface PaginationButtonsProps {
  hasMore: boolean;
}
export function usePaginationButtons() {
  const [page, setPage] = useState(1);
  const Comp = (props: PaginationButtonsProps) => {
    return (
      <div className="flex self-center gap-9 my-5">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          prev
        </Button>
        <div className="w-10 text-center">{page}</div>
        <Button
          disabled={!props.hasMore}
          onClick={() => setPage((prev) => prev + 1)}
        >
          next
        </Button>
      </div>
    );
  };
  return { page, setPage, Comp };
}
