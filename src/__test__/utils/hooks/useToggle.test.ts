import { useToggle } from "../../../utils/hooks/useToggle";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useToggle()", () => {
  it("should toggle the boolean", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });
});
