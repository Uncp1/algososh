import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  ReactEventHandler,
  useMemo,
  useState,
} from "react";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { delay } from "../../helpers/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";

export const QueuePage: FC = () => {
  type stackStateType = "" | "add" | "delete" | "clear";
  const [stackState, setStackState] = useState<stackStateType>("");
  const [value, setValue] = useState<string>("");
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const queue = useMemo(() => new Queue<string>(7), []);

  const isStackVisible = true; //

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };
  const putOnStack: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsDataLoading(true);
    setStackState("add");
    await delay(SHORT_DELAY_IN_MS);
    queue.enqueue(value);
    setValue("");
    setIsDataLoading(false);
    setStackState("");
  };

  const removeFromStack: ReactEventHandler<HTMLButtonElement> = async (e) => {
    setIsDataLoading(true);
    setStackState("delete");
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setIsDataLoading(false);
    setStackState("");
  };

  const clearStack = async () => {
    setIsDataLoading(true);
    setStackState("clear");
    await delay(SHORT_DELAY_IN_MS);
    queue.clear();
    setIsDataLoading(false);
    setStackState("");
  };

  return (
    <SolutionLayout title="Очередь">
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
          queue.queueArray.map((item: string, index: number) => (
            <Circle
              letter={item}
              key={nanoid()}
              // head={stack.stackArray.length - 1 === index ? "top" : ""}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </SolutionLayout>
  );
};
