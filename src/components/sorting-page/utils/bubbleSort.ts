import { swap } from "../../../helpers/utils";
import { Direction } from "../../../types/direction";
import { ElementStates } from "../../../types/states";
import { changeColor, SortArrayType, SortElementType } from "./utils";

export const bubbleSort = ({ array, direction }: SortArrayType) => {
  let arraySortingMap: SortElementType[][] = [];

  for (let i = array!.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      array[j] = changeColor(array[j], ElementStates.Changing);
      array[j + 1] = changeColor(array[j + 1], ElementStates.Changing);
      arraySortingMap.push([...array]);
      if (
        direction === Direction.Descending &&
        array[j].value < array[j + 1].value
      ) {
        swap(array, j, j + 1);
        arraySortingMap.push([...array]);
      }
      if (
        direction === Direction.Ascending &&
        array[j].value > array[j + 1].value
      ) {
        swap(array, j, j + 1);
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
