import React from "react";
import { Meta, Story } from "@storybook/react";
import Datepicker from "react-ada-keyboard-accessible-datepicker";

export default {
  title: "Atoms/Expected",
  component: Datepicker,
} as Meta;

const Template: Story<any> = (args) => <Datepicker />;

export const Default = Template.bind({});
Default.args = {};
