import { reverseInput } from "./reverseInput";

describe("reverse is successful", () => {
  const setValuesArray = jest.fn();
  const setFirstPointer = jest.fn();
  const setSecondPointer = jest.fn();

  it("for even number of characters", async () => {
    const value = "qwerty";
    const valueArray = value.split("");
    const expectedValue = "ytrewq";
    const expectedValueArray = expectedValue.split("");

    await reverseInput(
      valueArray,
      setValuesArray,
      setFirstPointer,
      setSecondPointer
    );
    expect(valueArray).toEqual(expectedValueArray);
    expect(setValuesArray).toHaveBeenLastCalledWith(expectedValueArray);
  });

  it("for odd number of characters", async () => {
    const value = "qwe";
    const valueArray = value.split("");
    const expectedValue = "ewq";
    const expectedValueArray = expectedValue.split("");

    await reverseInput(
      valueArray,
      setValuesArray,
      setFirstPointer,
      setSecondPointer
    );
    expect(valueArray).toEqual(expectedValueArray);
    expect(setValuesArray).toHaveBeenLastCalledWith(expectedValueArray);
  });

  it("for a string of one character", async () => {
    const value = "1";
    const valueArray = value.split("");

    await reverseInput(
      valueArray,
      setValuesArray,
      setFirstPointer,
      setSecondPointer
    );
    expect(setValuesArray).toHaveBeenCalledTimes(0);
  });

  it("for an empty string", async () => {
    const value = "";
    const valueArray = value.split("");

    await reverseInput(
      valueArray,
      setValuesArray,
      setFirstPointer,
      setSecondPointer
    );
    expect(setValuesArray).toHaveBeenCalledTimes(0);
  });
});
export {};
