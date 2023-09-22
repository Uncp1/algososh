import { ElementStates } from "../../../types/element-states";
import { changeColor, SortElementType } from "./utils";

interface ISortArrayType {
  array: SortElementType[];
  direction: "descending" | "ascending";
}

export const bubbleSort = ({ array, direction }: ISortArrayType) => {
  let arraySortingMap: SortElementType[][] = [];

  for (let i = array!.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      array[j] = changeColor(array[j], ElementStates.Changing);
      array[j + 1] = changeColor(array[j + 1], ElementStates.Changing);
      arraySortingMap.push([...array]);
      if (direction === "descending" && array[j].value < array[j + 1].value) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        arraySortingMap.push([...array]);
      }
      if (direction === "ascending" && array[j].value > array[j + 1].value) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        arraySortingMap.push([...array]);
      }
      array[j] = changeColor(array[j], ElementStates.Default);
      array[j + 1] = changeColor(array[j + 1], ElementStates.Default);
      arraySortingMap.push([...array]);
    }
    array[i] = changeColor(array[i], ElementStates.Modified);
    arraySortingMap.push([...array]);
  }
  return arraySortingMap;
};
