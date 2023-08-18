import { nanoid } from "nanoid";
import { ElementStates } from "../../../types/element-states";

interface IRndArray {
  minLength: number;
  maxLength: number;
  minValue: number;
  maxValue: number;
}

export const createRandomArray = ({
  minLength = 3,
  maxLength = 17,
  minValue = 0,
  maxValue = 100,
}: IRndArray) => {
  const arr = [];
  const arrLength = Math.random() * (maxLength - minLength) + minLength;

  for (let i = 0; i < arrLength; i++) {
    const elementValue = Math.random() * (maxValue - minValue) + maxValue;
    const element = {
      id: nanoid(),
      value: elementValue,
      state: ElementStates.Default,
    };
    arr.push(element);
  }

  return arr;
};
