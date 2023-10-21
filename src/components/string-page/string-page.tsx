import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./string-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { changeCircleColor } from "../../helpers/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { reverseInput } from "./utils/reverseInput";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [firstPointer, setFirstPointer] = useState<number>(0);
  const [secondPointer, setSecondPointer] = useState<number>(0);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    setValuesArray(e.currentTarget.value.split(""));
    setResultVisibility(false);
    setFirstPointer(0);
    setSecondPointer(valuesArray.length - 1);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setResultVisibility(true);
    setIsFormSubmitted(true);
    setValue("");
    await reverseInput(
      valuesArray,
      setValuesArray,
      setFirstPointer,
      setSecondPointer,
      DELAY_IN_MS
    );
    setFirstPointer(valuesArray.length);
    setSecondPointer(valuesArray.length);
    setIsFormSubmitted(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          data-testId="input"
          onChange={handleChange}
          value={value}
          maxLength={11}
          isLimitText={true}
          extraClass={styles.input}
          disabled={isFormSubmitted}
        />
        <Button
          data-testId="submit-button"
          type={"submit"}
          text={"Развернуть"}
          isLoader={isFormSubmitted}
          disabled={isFormSubmitted || !value}
        />
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
