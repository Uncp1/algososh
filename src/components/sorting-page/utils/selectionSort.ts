import { swap } from "../../../helpers/utils";
import { Direction } from "../../../types/direction";
import { ElementStates } from "../../../types/states";
import { changeColor, SortArrayType, SortElementType } from "./utils";

export const selectionSort = ({ array, direction }: SortArrayType) => {
  let arraySortingMap: SortElementType[][] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      array[i] = changeColor(array[i], ElementStates.Changing);
      array[j] = changeColor(array[j], ElementStates.Changing);
      arraySortingMap.push([...array]);
      if (
        direction === Direction.Descending &&
        array[j].value > array[i].value
      ) {
        swap(array, i, j);
        arraySortingMap.push([...array]);
      }
      if (
        direction === Direction.Ascending &&
        array[j].value < array[i].value
      ) {
        swap(array, i, j);
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
