import { ElementStates } from "../../../types/element-states";
import { changeColor, SortElementType } from "./changeColor";

interface ISortArrayType {
  array: SortElementType[];
  direction: "descending" | "ascending";
}

export const bubbleSort = ({ array, direction }: ISortArrayType) => {
  let arraySortingMap = [];
  for (let i = array!.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      changeColor(array[j], ElementStates.Changing);
      changeColor(array[j + 1], ElementStates.Changing);
      // arraySortingMap.push([...array]);
      if (direction === "descending" && array[j] < array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        arraySortingMap.push([...array]);
      }

      if (direction === "ascending" && array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        //  arraySortingMap.push([...array]);
      }

      changeColor(array[j], ElementStates.Default);
      changeColor(array[j + 1], ElementStates.Default);
      //   arraySortingMap.push([...array]);
    }
    changeColor(array[i], ElementStates.Default);
    // arraySortingMap.push([...array]);
  }
  console.log(array);

  return array;
};
