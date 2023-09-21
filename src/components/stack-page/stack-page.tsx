import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  ReactEventHandler,
  useMemo,
  useState,
} from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { delay } from "../../helpers/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";

export const StackPage: FC = () => {
  type stackStateType = "" | "add" | "delete" | "clear";

  const [value, setValue] = useState<string>("");
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [stackState, setStackState] = useState<stackStateType>("");

  const stack = useMemo(() => new Stack<string>(), []);

  const isStackVisible = useMemo(() => {
    return stack.stackArray.length > 0;
  }, [stack.stackArray.length]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };
  const putOnStack: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsDataLoading(true);
    setStackState("add");
    stack.push(value);
    await delay(SHORT_DELAY_IN_MS);

    setValue("");
    setIsDataLoading(false);
    setStackState("");
  };

  const removeFromStack: ReactEventHandler<HTMLButtonElement> = async (e) => {
    setIsDataLoading(true);
    setStackState("delete");
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setIsDataLoading(false);
    setStackState("");
  };

  const clearStack = async () => {
    setIsDataLoading(true);
    setStackState("clear");
    await delay(SHORT_DELAY_IN_MS);
    stack.clear();
    setIsDataLoading(false);
    setStackState("");
  };

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
            disabled={isDataLoading}
            autoComplete={"off"}
          />
          <Button
            type={"submit"}
            text={"Добавить"}
            isLoader={stackState === "add"}
            disabled={!value}
          />

          <Button
            type={"button"}
            text={"Удалить"}
            isLoader={stackState === "delete"}
            disabled={!isStackVisible}
            onClick={removeFromStack}
          />
        </div>

        <Button
          type={"reset"}
          text={"Очистить"}
          isLoader={stackState === "clear"}
          disabled={!isStackVisible}
          onClick={clearStack}
        />
      </form>

      <div className={styles.result}>
        {isStackVisible ? (
          stack.stackArray.map((item: string, index: number) => (
            <Circle
              index={index}
              letter={item}
              key={nanoid()}
              head={stack.stackArray.length - 1 === index ? "top" : ""}
              state={
                stackState === "clear"
                  ? ElementStates.Changing
                  : stackState !== "" && index === stack.stackArray.length - 1
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </SolutionLayout>
  );
};
