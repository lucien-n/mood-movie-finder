import { UIEventHandler, useRef, useState } from "react";

export const useScrollable = () => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(0);

  const handleScroll: UIEventHandler = (e): void => {
    setScroll(e.currentTarget.scrollTop);
  };

  const handleScrollToTop = (): void => {
    scrollableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    scrollableRef,
    scroll,
    handleScroll,
    handleScrollToTop,
  };
};
