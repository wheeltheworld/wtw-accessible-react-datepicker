import { act, renderHook } from '@testing-library/react-hooks';
import { Day } from '../../../types/Day';
import { generateButtonId } from '../../../utils/funcs/generateButtonId';
import { generateDay } from '../../../utils/funcs/generateDay';
import { useDateSelector } from '../../../utils/hooks/useDateSelector';

describe('useToggle()', () => {
    it('should initialize the selected dates to a tuple of length 2 of null values', () => {
        const { result } = renderHook(() => useDateSelector());
        expect(result.current.selected.length).toBe(2);
        expect(result.current.selected[0]).toBe(null);
        expect(result.current.selected[1]).toBe(null);
    });

    it('should initialize hovered to null', () => {
        const { result } = renderHook(() => useDateSelector());
        expect(result.current.hovered).toBe(null);
    });

    it("should initialize focusable to the id of the button of today's date", () => {
        const { result } = renderHook(() => useDateSelector());
        expect(result.current.focusable).toBe(generateButtonId(generateDay(new Date())));
    });

    it('should add a day to the first index of selected when addDate is called', () => {
        const { result } = renderHook(() => useDateSelector());
        const dateToAdd: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(dateToAdd);
        });

        expect(result.current.selected).toEqual([dateToAdd, null]);
    });

    it('should remove the date if added the same', () => {
        const { result } = renderHook(() => useDateSelector());
        const dateToAdd: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(dateToAdd);
        });
        act(() => {
            result.current.addDate(dateToAdd);
        });
        expect(result.current.selected).toEqual([null, null]);
    });

    it('should complete the tuple if the date added is after the first one', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        const second: Day = {
            day: 13,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        act(() => {
            result.current.addDate(second);
        });
        expect(result.current.selected).toEqual([first, second]);
    });

    it('should change the second date if the new date added is after the first one', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        const second: Day = {
            day: 13,
            month: 2,
            year: 2021,
        };
        const third: Day = {
            day: 20,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        act(() => {
            result.current.addDate(second);
        });
        act(() => {
            result.current.addDate(third);
        });
        expect(result.current.selected).toEqual([third, null]);
    });

    it('should remove the second selected date if the date added is the same than the second', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        const second: Day = {
            day: 13,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        act(() => {
            result.current.addDate(second);
        });
        act(() => {
            result.current.addDate(second);
        });
        expect(result.current.selected).toEqual([first, null]);
    });

    it('should remove both dates if the date added is the same than the first', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        const second: Day = {
            day: 13,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        act(() => {
            result.current.addDate(second);
        });
        act(() => {
            result.current.addDate(first);
        });
        expect(result.current.selected).toEqual([null, null]);
    });

    it('should replace the first date with a third date and remove the second one', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        const second: Day = {
            day: 13,
            month: 2,
            year: 2021,
        };
        const third: Day = {
            day: 11,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        act(() => {
            result.current.addDate(second);
        });
        act(() => {
            result.current.addDate(third);
        });
        expect(result.current.selected).toEqual([third, null]);
    });

    it('should change the first selected date if the date added is sooner than the first date', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 12,
            month: 2,
            year: 2021,
        };
        const second: Day = {
            day: 10,
            month: 2,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        expect(result.current.selected).toEqual([first, null]);
        act(() => {
            result.current.addDate(second);
        });
        expect(result.current.selected).toEqual([second, null]);
    });

    it('should set the focusable id', () => {
        const { result } = renderHook(() => useDateSelector());

        act(() => {
            result.current.setFocusable('hello');
        });
        expect(result.current.focusable).toEqual('hello');
    });

    it('should set the hovered day', () => {
        const { result } = renderHook(() => useDateSelector());
        const day: Day = {
            day: 4,
            month: 5,
            year: 2021,
        };
        act(() => {
            result.current.setHovered(day);
        });
        expect(result.current.hovered).toEqual(day);
    });

    it('should clear the selected dates', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 4,
            month: 5,
            year: 2021,
        };
        const second: Day = {
            day: 7,
            month: 5,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        act(() => {
            result.current.addDate(second);
        });
        expect(result.current.selected).toEqual([first, second]);
        act(() => {
            result.current.clearDates();
        });
        expect(result.current.selected).toEqual([null, null]);
    });

    it('should clear the second selected date', () => {
        const { result } = renderHook(() => useDateSelector());
        const first: Day = {
            day: 4,
            month: 5,
            year: 2021,
        };
        const second: Day = {
            day: 7,
            month: 5,
            year: 2021,
        };
        act(() => {
            result.current.addDate(first);
        });
        act(() => {
            result.current.addDate(second);
        });
        expect(result.current.selected).toEqual([first, second]);
        act(() => {
            result.current.clearDates(true);
        });
        expect(result.current.selected).toEqual([first, null]);
    });
});
