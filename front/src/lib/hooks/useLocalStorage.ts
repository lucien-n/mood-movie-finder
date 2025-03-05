import { useEffect, useState } from "react";

export const useLocalStorage = <T extends string | number | boolean>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const localValue = localStorage.getItem(key);
    if (localValue === null) return;

    setValue(JSON.parse(localValue));
  }, [key]);

  const set = (value: T) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, set];
};
