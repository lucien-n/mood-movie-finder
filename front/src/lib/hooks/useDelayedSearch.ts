import { useState } from "react";
import { useTimeout } from "./useTimeout";

type SetDelayedSearch = (newSearch: string) => void;

type UseDelayedSearch = (
  callback: (search: string) => void,
  initialValue: string,
  timeout?: number
) => [string, SetDelayedSearch];

export const useDelayedSearch: UseDelayedSearch = (
  callback,
  initialValue,
  timeout = 250
) => {
  const [search, setSearch] = useState(initialValue);

  const { reset } = useTimeout(() => callback(search), timeout);

  const set: SetDelayedSearch = (newSearch) => {
    setSearch(newSearch);
    reset();
  };

  return [search, set];
};
