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
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { changeCircleColor, delay, swap } from "../../helpers/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { RadioInput } from "../ui/radio-input/radio-input";
import { createRandomArray } from "./utils/createRandomArray";
import { Column } from "../ui/column/column";

export const SortingPage: FC = () => {
  const [value, setValue] = useState<string>("");
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  type SortElement = {
    readonly id: string;
    value: number;
    // state: ElementStatesVariety;
  };

  const [sortArray, setSortArray] = useState<SortElement[]>([]);

  const [sortingAlgo, setSortingAlgo] = useState<"selection" | "bubble">(
    "selection"
  );
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    setValuesArray(e.currentTarget.value.split(""));
    setResultVisibility(false);
  };

  const createArray: ReactEventHandler<HTMLButtonElement> = () => {
    const array = createRandomArray({
      minLength: 3,
      maxLength: 17,
      minValue: 0,
      maxValue: 100,
    });
    setSortArray(array);
  };

  const handleAscending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection("ascending");
    /*await startSorting({
      array: sortArray,
      direction: Direction.Ascending,
      type: sortType,
    }); */
  };

  const handleDescending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection("descending");
    /*  await startSorting({
      array: sortArray,
      direction: Direction.Descending,
      type: sortType,
    }); */
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <fieldset>
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

        <fieldset>
          <Button
            type={"button"}
            text={"По возрастанию"}
            onClick={handleAscending}
          />
          <Button
            type={"button"}
            text={"По убыванию"}
            onClick={handleDescending}
          />
          <Button type={"button"} text={"Новый массив"} onClick={createArray} />
        </fieldset>
      </form>

      <div className={styles.result}>
        {sortArray?.map((item) => (
          <Column key={item.id} index={item.value} />
        ))}
      </div>
    </SolutionLayout>
  );
};
