import { useState } from "react";

export const useToggle = (initial?: boolean) => {
  const [value, setValue] = useState(initial || false);

  const toggle = (val?: boolean) =>
    setValue((v) => (val === undefined ? !v : val));

  return [value, toggle] as const;
};
