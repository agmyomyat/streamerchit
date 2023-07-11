import { useMemo } from 'react';

export function useQueryValue(querykey: string) {
  const token = useMemo(
    () =>
      window.location.search
        ? window.location.search.split(`${querykey}=`)[1]
        : null,
    [querykey]
  );
  return token;
}
