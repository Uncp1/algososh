import { FC, ReactEventHandler, useState } from "react";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../../helpers/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { RadioInput } from "../ui/radio-input/radio-input";
import { createRandomArray } from "./utils/createRandomArray";
import { Column } from "../ui/column/column";
import { bubbleSort } from "./utils/bubbleSort";
import { SortArrayType, SortElementType } from "./utils/utils";
import { selectionSort } from "./utils/selectionSort";
import { ElementStates } from "../../types/states";
import { Direction } from "../../types/direction";

export const SortingPage: FC = () => {
  const [isSortingInProgress, setIsSortingInProgress] =
    useState<boolean>(false);
  const [valuesArray, setValuesArray] = useState<SortElementType[]>([]);
  const [sortingAlgo, setSortingAlgo] = useState<"selection" | "bubble">(
    "selection"
  );
  const [sortDirection, setSortDirection] = useState<
    Direction.Ascending | Direction.Descending
  >(Direction.Ascending);

  const createArray: ReactEventHandler<HTMLButtonElement> = () => {
    const newArray = createRandomArray({
      minLength: 3,
      maxLength: 17,
      minValue: 0,
      maxValue: 100,
    });
    setValuesArray(newArray);
  };

  const handleAscending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection(Direction.Ascending);
    await startSorting({
      array: valuesArray,
      direction: Direction.Ascending,
    });
  };

  const handleDescending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection(Direction.Descending);
    await startSorting({
      array: valuesArray,
      direction: Direction.Descending,
    });
  };

  const startSorting = async (sortOptions: SortArrayType) => {
    setIsSortingInProgress(true);
    let i = 0;
    let arrayMap: SortElementType[][];

    valuesArray.forEach((el) => {
      return (el.state = ElementStates.Default);
    }); //change colour for subsequent sorting

    sortingAlgo === "selection"
      ? (arrayMap = selectionSort(sortOptions))
      : (arrayMap = bubbleSort(sortOptions));

    while (i < arrayMap.length) {
      setValuesArray(arrayMap[i]);
      await delay(SHORT_DELAY_IN_MS);
      i++;
    }
    setIsSortingInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <fieldset
          className={`${styles.form_fieldset} ${styles.form_fieldset_type_radio}`}
        >
          <RadioInput
            name="algo"
            label={"Выбор"}
            defaultChecked
            onChange={() => setSortingAlgo("selection")}
          />
          <RadioInput
            name="algo"
            label={"Пузырёк"}
            onChange={() => setSortingAlgo("bubble")}
          />
        </fieldset>

        <fieldset
          className={`${styles.form_fieldset} ${styles.form_fieldset_type_buttons}`}
        >
          <Button
            type={"button"}
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            onClick={handleAscending}
            disabled={valuesArray.length === 0 || isSortingInProgress}
            isLoader={
              isSortingInProgress && sortDirection === Direction.Ascending
            }
          />
          <Button
            type={"button"}
            text={"По убыванию"}
            sorting={Direction.Descending}
            onClick={handleDescending}
            disabled={valuesArray.length === 0 || isSortingInProgress}
            isLoader={
              isSortingInProgress && sortDirection === Direction.Descending
            }
          />
          <Button
            type={"button"}
            text={"Новый массив"}
            onClick={createArray}
            extraClass={styles.form_reset}
            disabled={isSortingInProgress}
          />
        </fieldset>
      </form>

      <div className={styles.result}>
        {valuesArray?.map((item) => (
          <Column key={item.id} index={item.value} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
