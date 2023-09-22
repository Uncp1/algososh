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
  type QueueType = "" | "add" | "delete" | "clear";
  const [queueState, setQueueState] = useState<QueueType>("");
  const [value, setValue] = useState<string>("");
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const queue = useMemo(() => new Queue<string>(7), []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };
  const addToQueue: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsDataLoading(true);
    setQueueState("add");
    queue.enqueue(value);
    await delay(SHORT_DELAY_IN_MS);
    setValue("");
    setIsDataLoading(false);
    setQueueState("");
  };

  const removeFromStack: ReactEventHandler<HTMLButtonElement> = async (e) => {
    setIsDataLoading(true);
    setQueueState("delete");
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setIsDataLoading(false);
    setQueueState("");
  };

  const clearStack = async () => {
    setIsDataLoading(true);
    setQueueState("clear");
    await delay(SHORT_DELAY_IN_MS);
    queue.clear();
    setIsDataLoading(false);
    setQueueState("");
  };

  const determineState = (item: string, index: number) => {
    if (queueState === "clear" && item) return ElementStates.Changing;
    if (queueState === "add" && index === queue.tail - 1)
      return ElementStates.Changing;
    if (queueState === "delete" && index === queue.head)
      return ElementStates.Changing;
    return ElementStates.Default;
  };
  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={addToQueue} className={styles.form}>
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
            isLoader={queueState === "add"}
            disabled={!value && queue.length === 7} // ungaBunga
          />

          <Button
            type={"button"}
            text={"Удалить"}
            isLoader={queueState === "delete"}
            disabled={queue.length === 0}
            onClick={removeFromStack}
          />
        </div>

        <Button
          type={"reset"}
          text={"Очистить"}
          isLoader={queueState === "clear"}
          disabled={queue.length === 0}
          onClick={clearStack}
        />
      </form>

      <div className={styles.result}>
        {queue.queueArray.map((item: string, index: number) => (
          <Circle
            letter={item}
            key={nanoid()}
            head={item && queue.head === index ? "head" : ""}
            tail={item && queue.tail - 1 === index ? "tail" : ""}
            state={determineState(item, index)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
