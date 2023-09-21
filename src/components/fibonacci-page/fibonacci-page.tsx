import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { delay } from "../../helpers/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number | string>("");
  const [valuesArray, setValuesArray] = useState<number[]>([]);

  const [resultVisibility, setResultVisibility] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const createFibonacciSequence = async () => {
    let fibonacciArray: number[] = [];
    for (let i = 0; i < +value + 1; i++) {
      if (fibonacciArray.length === 0 || fibonacciArray.length === 1) {
        fibonacciArray.push(1);
      } else {
        fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1]);
      }
    }

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
    if (valuesArray !== []) setValuesArray([]);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setResultVisibility(true);
    setIsFormSubmitted(true);
    setValue("");
    await createFibonacciSequence();
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
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
