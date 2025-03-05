"use client";

import { useCallback, useEffect, useRef } from "react";

type UseTimeout = (
  func: VoidFunction,
  timeout: number
) => { reset: VoidFunction; start: VoidFunction; clear: VoidFunction };

export const useTimeout: UseTimeout = (func, timeoutMs) => {
  const callbackRef = useRef(func);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const start = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), timeoutMs);
  }, [timeoutMs]);

  const clear = useCallback(
    () => timeoutRef.current && clearTimeout(timeoutRef.current),
    []
  );

  const reset = useCallback(() => {
    clear();
    start();
  }, [clear, start]);

  useEffect(() => {
    callbackRef.current = func;
  }, [func]);

  useEffect(() => {
    start();
    return clear;
  }, [timeoutMs, start, clear]);

  return { reset, clear, start };
};
