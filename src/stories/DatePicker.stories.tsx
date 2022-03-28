import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Datepicker, { DatePickerProps } from '../DatePicker';
import { useToggle } from '../utils/hooks/useToggle';
import { SelectedDates } from '../types/SelectedDates';
import { generateDay } from '../utils/funcs/generateDay';

export default {
    title: 'Atoms/DatePicker',
    component: Datepicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
    const [open, toggle] = useToggle(true);
    const [multiple, toggleMultiple] = useToggle(true);
    const [date, setDate] = useState<SelectedDates>([null, null]);
    return (
        <>
            <button onClick={() => toggle()}>
                {date[0]
                    ? `Selected from ${date[0].day}/${date[0].month}/${date[0].year}
          ${
              date[1] &&
              `to ${date[1].day}/${date[1].month}/
          ${date[1].year}`
          }`
                    : 'Datepicker'}
            </button>
            <button onClick={() => toggleMultiple()}>toggle multiple</button>

            <Datepicker
                {...args}
                isOpen={open}
                handleToggle={toggle}
                onChange={setDate}
                value={date}
                multipleSelect={multiple}
            />
        </>
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
