import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  ReactEventHandler,
  useState,
} from "react";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { nanoid } from "nanoid";
import { changeCircleColor, delay, swap } from "../../helpers/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { RadioInput } from "../ui/radio-input/radio-input";
import { createRandomArray } from "./utils/createRandomArray";
import { Column } from "../ui/column/column";
import { bubbleSort } from "./utils/bubbleSort";
import { SortArrayType, SortElementType } from "./utils/utils";
import { ElementStates } from "../../types/element-states";
import { selectionSort } from "./utils/selectionSort";

export const SortingPage: FC = () => {
  const [isSortingInProgress, setIsSortingInProgress] =
    useState<boolean>(false);
  const [valuesArray, setValuesArray] = useState<SortElementType[]>([]);
  const [sortingAlgo, setSortingAlgo] = useState<"selection" | "bubble">(
    "selection"
  );
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");

  const createArray: ReactEventHandler<HTMLButtonElement> = () => {
    setValuesArray(
      createRandomArray({
        minLength: 3,
        maxLength: 17,
        minValue: 0,
        maxValue: 100,
      })
    );
  };

  const handleAscending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection("ascending");
    await startSorting({
      array: valuesArray,
      direction: "ascending",
    });
  };

  const handleDescending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection("descending");
    await startSorting({
      array: valuesArray,
      direction: "descending",
    });
  };

  const startSorting = async (sortOptions: SortArrayType) => {
    setIsSortingInProgress(true);
    let i = 0;
    let arrayMap: SortElementType[][];

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
            onClick={handleAscending}
            disabled={valuesArray.length === 0 || isSortingInProgress}
            isLoader={isSortingInProgress && sortDirection === "ascending"}
          />
          <Button
            type={"button"}
            text={"По убыванию"}
            onClick={handleDescending}
            disabled={valuesArray.length === 0 || isSortingInProgress}
            isLoader={isSortingInProgress && sortDirection === "descending"}
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
