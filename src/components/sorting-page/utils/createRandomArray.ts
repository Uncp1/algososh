import { nanoid } from "nanoid";
import { ElementStates } from "../../../types/element-states";

interface IRndArray {
  minLength: number;
  maxLength: number;
  minValue: number;
  maxValue: number;
}

export const createRandomArray = ({
  minLength,
  maxLength,
  minValue,
  maxValue,
}: IRndArray) => {
  const arr = [];
  const arrLength = Math.round(
    Math.random() * (maxLength - minLength) + minLength
  );

  for (let i = 0; i < arrLength; i++) {
    const elementValue = Math.round(
      Math.random() * (maxValue - minValue) + minValue
    );
    console.log();

    const element = {
      id: nanoid(),
      value: elementValue,
      state: ElementStates.Default,
    };
    arr.push(element);
  }

  return arr;
};
