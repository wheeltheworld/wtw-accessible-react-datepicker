import React from "react";
import { Meta, Story } from "@storybook/react";
import Datepicker from "../DatePicker";

export default {
  title: "Atoms/DatePicker",
  component: Datepicker,
} as Meta;

const Template: Story<any> = (args) => (
  <>
    <input type='text' />
    <Datepicker {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
