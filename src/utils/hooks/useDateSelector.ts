import { useState } from "react";
import { Day } from "../../types/Day";
import { Tuple } from "../../types/Tuple";
import { dayIsSooner } from "../funcs/dayIsSooner";
import { generateButtonId } from "../funcs/generateButtonId";
import { generateDay } from "../funcs/generateDay";

export const useDateSelector = (initial?: Tuple<Day | null, 2>) => {
  const [selected, setSelected] = useState<Tuple<Day | null, 2>>(
    initial || [null, null]
  );
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

  /**
   * Will clear the dates when called
   * @param onlySecond if true will only clear the second date
   */
  const clearDates = (onlySecond = false) => {
    if (onlySecond) return setSelected([selected[0], null]);

    setSelected([null, null]);
  };

  const force = (val: typeof selected) => {
    setSelected(val);
  };

  return {
    selected,
    addDate,
    hovered,
    setHovered,
    focusable,
    setFocusable,
    clearDates,
    force,
  } as const;
};
