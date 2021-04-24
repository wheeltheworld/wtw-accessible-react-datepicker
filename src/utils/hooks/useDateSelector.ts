import { useState } from "react";
import { Day, Tuple } from "../../types";

export const useDateSelector = () => {
  const [selected, setSelected] = useState<Tuple<Day | null, 2>>([null, null]);

  const addDate = (day: Day) => {
    setSelected([day, day]);
  };

  return [selected, addDate] as const;
};
