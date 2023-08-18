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

export const SortingPage: FC = () => {
  const [value, setValue] = useState<string>("");
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [firstPointer, setFirstPointer] = useState<number>(0);
  const [secondPointer, setSecondPointer] = useState<number>(0);

  const reverseInput = async () => {
    let start = 0;
    let end = valuesArray.length - 1;
    while (start < end) {
      setFirstPointer(start);
      setSecondPointer(end);
      await delay(DELAY_IN_MS);
      swap(valuesArray, start, end);
      setValuesArray(valuesArray);
      start++;
      end--;
    }
    setFirstPointer(valuesArray.length);
    setSecondPointer(valuesArray.length);
    setIsFormSubmitted(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    setValuesArray(e.currentTarget.value.split(""));
    setResultVisibility(false);
    setFirstPointer(0);
    setSecondPointer(valuesArray.length - 1);
  };

  const createArray: ReactEventHandler<HTMLButtonElement> = () => {
    console.log(
      createRandomArray({
        minLength: 3,
        maxLength: 17,
        minValue: 0,
        maxValue: 100,
      })
    );
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <fieldset>
          <RadioInput label={"Выбор"} defaultChecked />
          <RadioInput label={"Пузырёк"} />
        </fieldset>

        <fieldset>
          <Button type={"button"} text={"По возрастанию"} />
          <Button type={"button"} text={"По убыванию"} />
          <Button type={"button"} text={"Новый массив"} onClick={createArray} />
        </fieldset>
      </form>

      <div className={styles.result}>
        {resultVisibility ? (
          valuesArray.map((item: string, index: number) => (
            <Circle
              state={changeCircleColor(firstPointer, secondPointer, index)}
              letter={item}
              key={nanoid()}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </SolutionLayout>
  );
};
