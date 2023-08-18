import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useMemo,
  useState,
} from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { changeCircleColor, delay, swap } from "../../helpers/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";

export const StackPage: FC = () => {
  const [value, setValue] = useState<string>("");
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const stack = useMemo(() => new Stack<string>(), []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };
  const putOnStack: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    stack.push(value);
    setValue("");
  };

  const removeFromStack: FormEventHandler<HTMLFormElement> = async (e) => {};

  const clearStack = () => {};

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={putOnStack} className={styles.form}>
        <div className={styles.inputs}>
          <Input
            onChange={handleChange}
            value={value}
            maxLength={4}
            isLimitText={true}
            type={"textAltEndind"}
            extraClass={styles.input}
            disabled={isFormSubmitted}
          />
          <Button
            type={"submit"}
            text={"Добавить"}
            isLoader={isFormSubmitted}
            disabled={isFormSubmitted || !value}
          />

          <Button
            type={"button"}
            text={"Удалить"}
            isLoader={isFormSubmitted}
            disabled={isFormSubmitted || !value}
          />
        </div>

        <Button
          type={"reset"}
          text={"Очистить"}
          isLoader={isFormSubmitted}
          disabled={isFormSubmitted || !value}
        />
      </form>

      <div className={styles.result}>
        {resultVisibility ? (
          valuesArray.map((item: string, index: number) => (
            <Circle
              // state={changeCircleColor(firstPointer, secondPointer, index)}
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
