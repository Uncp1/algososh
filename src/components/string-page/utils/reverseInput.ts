import { Dispatch, SetStateAction } from "react";
import { delay, swap } from "../../../helpers/utils";

export const reverseInput = async (
  valuesArray: string[],
  setValuesArray: Dispatch<SetStateAction<string[]>>,
  setFirstPointer: Dispatch<SetStateAction<number>>,
  setSecondPointer: Dispatch<SetStateAction<number>>,
  timeOut: number = 0
) => {
  let start = 0;
  let end = valuesArray.length - 1;
  while (start < end) {
    setFirstPointer(start);
    setSecondPointer(end);
    await delay(timeOut);
    swap(valuesArray, start, end);
    setValuesArray(valuesArray);
    start++;
    end--;
  }
};
