import { useState, useCallback } from "react";

export const useToggle = (initial?: boolean) => {
  const [value, setValue] = useState(initial || false);
  const toggle = useCallback(() => setValue((v) => !v), [setValue]);

  return [value, toggle] as const;
};
