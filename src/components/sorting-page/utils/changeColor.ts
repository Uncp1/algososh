import { type } from "os";
import { ElementStates } from "../../../types/element-states";

export type SortElementType = {
  readonly id: string;
  value: number;
  state: ElementStates;
};

export type SortArrayType = {
  array: [];
  direction: "descending" | "ascending";
};

export const changeColor = (
  element: SortElementType,
  color: ElementStates
): SortElementType => {
  return {
    ...element,
    state: color,
  };
};
