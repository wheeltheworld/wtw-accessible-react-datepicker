import { useState } from "react";
import { Day, Tuple } from "../../types";
import { dayIsSooner } from "../funcs/dayIsSooner";
import { generateButtonId } from "../funcs/generateButtonId";
import { generateDay } from "../funcs/generateDay";

export const useDateSelector = () => {
  const [selected, setSelected] = useState<Tuple<Day | null, 2>>([null, null]);
  const [hovered, setHovered] = useState<Day | null>(null);
  const [focusable, setFocusable] = useState<string>(
    generateButtonId(generateDay(new Date()))
  );

  const addDate = (day: Day) => {
    if (!selected[0]) return setSelected([day, null]);

    if (JSON.stringify(day) === JSON.stringify(selected[0]))
      return setSelected([null, null]);

    if (JSON.stringify(day) === JSON.stringify(selected[1]))
      return setSelected([selected[0], null]);

    if (selected[1] && dayIsSooner(day, selected[0])) {
      return setSelected([day, selected[1]]);
    }

    if (dayIsSooner(day, selected[0])) {
      return setSelected([day, null]);
    }

    setSelected([selected[0], day]);
  };

  return {
    selected,
    addDate,
    hovered,
    setHovered,
    focusable,
    setFocusable,
  } as const;
};
