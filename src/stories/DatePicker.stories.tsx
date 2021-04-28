import React from "react";
import { Meta, Story } from "@storybook/react";
import Datepicker, { DatePickerProps } from "../DatePicker";
import { useDateSelector } from "../utils/hooks/useDateSelector";
import { useToggle } from "../utils/hooks/useToggle";

export default {
  title: "Atoms/DatePicker",
  component: Datepicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
  const [open, toggle] = useToggle(true);
  const dateSelector = useDateSelector();
  return (
    <>
      <input type='text' />
      {dateSelector.selected[0] && (
        <p>
          Selected from {dateSelector.selected[0].day}/
          {dateSelector.selected[0].month}/{dateSelector.selected[0].year}{" "}
          {dateSelector.selected[1] &&
            `to ${dateSelector.selected[1].day}/${dateSelector.selected[1].month}/
          ${dateSelector.selected[1].year}`}
        </p>
      )}
      <Datepicker
        {...args}
        isOpen={open}
        handleToggle={toggle}
        dateSelector={dateSelector}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  styles: {
    disabled: "#949494",
    normal: "#232323",
    between: "#D5E2FA",
    selected: "#2F6FE4",
    background: "white",
    font: "sans-serif",
  },
  minDate: new Date(),
  maxDate: new Date(2021, 4, 21),
};
