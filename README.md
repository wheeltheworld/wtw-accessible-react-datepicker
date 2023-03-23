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

# How to contribute

- Create a branch
- Make your changes
- Commit your changes
- Run `npm version patch` or `npm version minor` or `npm version major` depending on the change
- Push that version change
- Open a PR and merge it
- Create a new release on Github using a tag with the version that you pushed with the prefix 'v' and press the 'Generate release notes'
