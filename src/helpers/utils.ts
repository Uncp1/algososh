import { ElementStates } from "../types/element-states";

export const swap = (array: unknown[], start: number, end: number): void => {
  const temp = array[start];
  array[start] = array[end];
  array[end] = temp;
};
export const delay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const changeCircleColor = (
  startIndex: number,
  endIndex: number,
  index: number
): ElementStates => {
  if (startIndex === index) return ElementStates.Changing;
  if (endIndex === index) return ElementStates.Changing;
  if (startIndex > index) return ElementStates.Modified;
  if (endIndex < index) return ElementStates.Modified;
  if (startIndex === endIndex) return ElementStates.Modified;
  return ElementStates.Default;
};
