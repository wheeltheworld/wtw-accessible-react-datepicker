import React, { useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement | null>(
  ref: React.MutableRefObject<T>,
  handler: (e: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as T)) {
        return;
      }

      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
