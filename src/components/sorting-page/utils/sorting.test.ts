import { selectionSort } from "./selectionSort";
import { bubbleSort } from "./bubbleSort";
import { Direction } from "../../../types/direction";
import { SortElementType } from "./utils";
import { ElementStates } from "../../../types/states";

describe("array is sorted correctly", () => {
  let array: SortElementType[] = [];
  let expectedArray: SortElementType[] = [];
  let sortedArray: SortElementType[][] = [[]];

  beforeEach(() => {
    array = [];
    expectedArray = [];
    sortedArray = [[]];
  });
  describe("using selection", () => {
    it("empty arr", () => {
      sortedArray = selectionSort({ array, direction: Direction.Descending });
      expect(sortedArray).toEqual([]);
    });

    it("arr with 1 el", () => {
      array = [
        {
          id: "1",
          value: 1,
          state: ElementStates.Default,
        },
      ];
      expectedArray = [
        {
          id: "1",
          value: 1,
          state: ElementStates.Modified,
        },
      ];
      sortedArray = selectionSort({ array, direction: Direction.Descending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });

    it("arr with multiple el", () => {
      array = [
        {
          id: "3",
          value: 49,
          state: ElementStates.Default,
        },
        {
          id: "1",
          value: 1,
          state: ElementStates.Default,
        },
        {
          id: "4",
          value: 343,
          state: ElementStates.Default,
        },
        {
          id: "2",
          value: 7,
          state: ElementStates.Default,
        },
      ];
      expectedArray = [
        {
          id: "1",
          value: 1,
          state: ElementStates.Modified,
        },
        {
          id: "2",
          value: 7,
          state: ElementStates.Modified,
        },
        {
          id: "3",
          value: 49,
          state: ElementStates.Modified,
        },
        {
          id: "4",
          value: 343,
          state: ElementStates.Modified,
        },
      ];
      sortedArray = selectionSort({ array, direction: Direction.Ascending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });
  });

  describe("using bubble", () => {
    it("empty arr", () => {
      sortedArray = bubbleSort({ array, direction: Direction.Ascending });
      expect(sortedArray).toEqual([]);
    });

    it("arr with 1 el", () => {
      array = [
        {
          id: "1",
          value: 1,
          state: ElementStates.Default,
        },
      ];
      expectedArray = [
        {
          id: "1",
          value: 1,
          state: ElementStates.Modified,
        },
      ];
      sortedArray = bubbleSort({ array, direction: Direction.Ascending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });

    it("arr with multiple el", () => {
      array = [
        {
          id: "3",
          value: 49,
          state: ElementStates.Default,
        },
        {
          id: "1",
          value: 1,
          state: ElementStates.Default,
        },
        {
          id: "4",
          value: 343,
          state: ElementStates.Default,
        },
        {
          id: "2",
          value: 7,
          state: ElementStates.Default,
        },
      ];
      expectedArray = [
        {
          id: "1",
          value: 1,
          state: ElementStates.Modified,
        },
        {
          id: "2",
          value: 7,
          state: ElementStates.Modified,
        },
        {
          id: "3",
          value: 49,
          state: ElementStates.Modified,
        },
        {
          id: "4",
          value: 343,
          state: ElementStates.Modified,
        },
      ];
      sortedArray = bubbleSort({ array, direction: Direction.Ascending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });
  });
});
