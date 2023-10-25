import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { delay } from "../../helpers/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { getFibonacciArray } from "./utils/sequence";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number | string>("");
  const [valuesArray, setValuesArray] = useState<number[]>([]);

  const [resultVisibility, setResultVisibility] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const createFibonacciSequence = async () => {
    const fibonacciArray = getFibonacciArray(Number(value));
    let i = 0;
    while (i <= value) {
      setValuesArray((arr) => [...arr, fibonacciArray[i]]); // rerender circles
      await delay(DELAY_IN_MS);
      i++;
    }
    setIsFormSubmitted(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    setResultVisibility(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setResultVisibility(true);
    setIsFormSubmitted(true);
    setValue("");
    setValuesArray([]);
    await createFibonacciSequence();
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          data-testid="input"
          onChange={handleChange}
          value={value}
          type={"number"}
          min={1}
          max={19}
          isLimitText={true}
          placeholder={"Введите число"}
          extraClass={styles.input}
          disabled={isFormSubmitted}
          autoComplete={"off"}
        />
        <Button
          data-testid="submit-button"
          type={"submit"}
          text={"Рассчитать"}
          isLoader={isFormSubmitted}
          disabled={isFormSubmitted || !value || value > 19}
        />
      </form>

      <div className={styles.result}>
        {resultVisibility ? (
          valuesArray.map((item: number, index: number) => (
            <Circle index={index} letter={item.toString()} key={nanoid()} />
          ))
        ) : (
          <></>
        )}
      </div>
    </SolutionLayout>
  );
};
