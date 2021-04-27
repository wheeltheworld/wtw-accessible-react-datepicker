import React, { useCallback, useState } from "react";
import { Meta, Story } from "@storybook/react";
import Datepicker from "../DatePicker";

export default {
  title: "Atoms/DatePicker",
  component: Datepicker,
} as Meta;

const Template: Story<any> = (args) => {
  const [open, setOpen] = useState(true);
  const toggle = useCallback(() => setOpen((o) => !o), [setOpen]);
  return (
    <>
      <input type='text' />
      <Datepicker {...args} isOpen={open} handleToggle={toggle} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
