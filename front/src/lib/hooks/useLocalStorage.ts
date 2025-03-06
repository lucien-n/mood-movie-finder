"use client";

import { useEffect, useState } from "react";

type ValidType = string | number | boolean | object;

type SetAction<T> = (action: ((prev: T) => T) | T) => void;

export const useLocalStorage = <T extends ValidType>(
  key: string,
  defaultValue: T
): [T, SetAction<T>] => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const localValue = localStorage.getItem(key);
    if (localValue === null) return;

    setValue(JSON.parse(localValue));
  }, [key]);

  const set: SetAction<T> = (action): void => {
    const newValue = typeof action === "function" ? action(value) : action;

    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, set];
};
