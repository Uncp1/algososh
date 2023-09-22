import { ElementStates } from "../../../types/element-states";
import { changeColor, SortElementType } from "./utils";

interface ISortArrayType {
  array: SortElementType[];
  direction: "descending" | "ascending";
}

export const selectionSort = ({ array, direction }: ISortArrayType) => {
  let arraySortingMap: SortElementType[][] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      array[i] = changeColor(array[i], ElementStates.Changing);
      array[j] = changeColor(array[j], ElementStates.Changing);
      arraySortingMap.push([...array]);
      if (direction === "descending" && array[j].value > array[i].value) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        arraySortingMap.push([...array]);
      }
      if (direction === "ascending" && array[j].value < array[i].value) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        arraySortingMap.push([...array]);
      }
      array[i] = changeColor(array[i], ElementStates.Default);
      array[j] = changeColor(array[j], ElementStates.Default);
      arraySortingMap.push([...array]);
    }
    array[i] = changeColor(array[i], ElementStates.Modified);
    arraySortingMap.push([...array]);
  }
  return arraySortingMap;
};
