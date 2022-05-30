import React from 'react';
import { Meta, Story } from '@storybook/react';
import Datepicker, { DatePickerProps } from '../DatePicker';
import { generateDay } from '../utils/funcs/generateDay';

export default {
    title: 'Atoms/DatePicker',
    component: Datepicker,
    argTypes: {
        isOpen: {
            control: {
                type: 'boolean'
            },
            defaultValue: true
        },
        multipleSelect: {
            control: {
                type: 'boolean'
            }
        },
        value: {
            control: { type: 'object' },
            defaultValue: []
        },
        minDate: {
            control: { type: 'object' }
        },
        maxDate: {
            control: { type: 'object' }
        },
    }
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
    return (
        <Datepicker
                {...args}
            />
    );
};

export const Default = Template.bind({});
Default.args = {
    styles: {
        disabled: '#949494',
        normal: '#232323',
        between: '#D5E2FA',
        selected: '#2F6FE4',
        background: 'white',
        font: 'sans-serif',
    },
    minDate: generateDay(new Date()),
};
