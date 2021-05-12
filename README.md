# WTW-Accessible-React-Datepicker

WTW-Accessible-React-Datepicker is a datepicker that shows 2 calendars at the time, keeping the accessibility as a focus, following the WAI standards ( https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html ).


## Installation


```bash
yarn add wtw-accessible-react-datepicker
```
or
```bash
npm install wtw-accessible-react-datepicker
```
## Usage

```tsx
import React from "react";
import { Datepicker, useToggle } from "wtw-accessible-react-datepicker";

const DatePickerContainer = () => {
  const [open, toggle] = useToggle()

  return (
      <Datepicker
        isOpen={open}
        handleToggle={toggle}  
        dateSelector={dateSelector}
        onChange={(newValue) => console.log(newValue)}
      />
  );
};
```
