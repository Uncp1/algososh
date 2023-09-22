import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useMemo,
  useState,
} from "react";
import styles from "./lsit-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { changeCircleColor, delay, swap } from "../../helpers/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList, LinkedListNode } from "./linked-list";

export const ListPage: FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const [resultVisibility, setResultVisibility] = useState<boolean>(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [firstPointer, setFirstPointer] = useState<number>(0);
  const [secondPointer, setSecondPointer] = useState<number>(0);

  const list = useMemo(() => new LinkedList<string>(), []);
  console.log(list);

  const handleAddNewHead = async () => {
    setIsFormSubmitting(true);
    await delay(SHORT_DELAY_IN_MS);
    list.prepend(value);
    await delay(SHORT_DELAY_IN_MS);
    setIsFormSubmitting(false);
  };

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
    setIsFormSubmitting(false);
  };
  /*
  const handleAddNewHead: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsDataLoading(true);
    setStackState("add");
    await delay(SHORT_DELAY_IN_MS);
    stack.push(value);
    setValue("");
    setIsDataLoading(false);
    setStackState("");
  };

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
    setIsFormSubmitting(true);
    setValue("");
    await reverseInput();
  }; */
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <fieldset className={styles.form__fieldset}>
          <Input
            disabled={
              false //    isFormSubmitting || array.length >= LIST_MAX_LENGTH_LINKED_LIST
            }
            //value={inputValue}
            //maxLength={INPUT_MAX_LENGTH_LINKED_LIST}
            isLimitText={true}
            // onChange={(e) => setInputValue(e.currentTarget.value)}
            extraClass={styles.form__input}
            placeholder={"Введите значение"}
          />
          <Button
            // disabled={isFormSubmitting || !inputValue}
            //isLoader={solutionState === LinkedListStateVariety.AddToHead}
            type={"button"}
            text={"Добавить в head"}
            extraClass={`${styles.form_button}`}
            onClick={handleAddNewHead}
          />
          <Button
            // disabled={isFormSubmitting || !inputValue}
            //isLoader={solutionState === LinkedListStateVariety.AddToTail}
            type={"button"}
            text={"Добавить в tail"}
            extraClass={styles.form_button}
            //onClick={handleAddNewTail}
          />
          <Button
            //disabled={isFormSubmitting || array.length <= 0}
            // isLoader={solutionState === LinkedListStateVariety.DeleteFromHead}
            type={"button"}
            text={"Удалить из head"}
            extraClass={`${styles.form_button}`}
            // onClick={handleDeleteHead}
          />
          <Button
            //  disabled={isFormSubmitting || array.length <= 0}
            //   isLoader={solutionState === LinkedListStateVariety.DeleteFromTail}
            type={"button"}
            text={"Удалить из tail"}
            extraClass={styles.form_button}
            //onClick={handleDeleteTail}
          />
        </fieldset>
        <fieldset className={styles.form__fieldset}>
          <Input
            //disabled={array.length === 0 || isFormSubmitting}
            //value={inputIndex}
            // onChange={(e) => setInputIndex(e.currentTarget.value)}
            // min={LIST_MIN_INDEX_LINKED_LIST}
            //  max={array.length > 1 ? array.length - 1 : " 0 "}
            type={"number"}
            extraClass={styles.form__input}
            placeholder={"Введите индекс"}
          />
          <Button
            //    disabled={
            //  Number(inputIndex) < LIST_MIN_INDEX_LINKED_LIST ||
            //  Number(inputIndex) >= array.length ||
            //isFormSubmitting ||
            // !inputIndex ||
            // !inputValue
            //  }
            //  isLoader={solutionState === LinkedListStateVariety.AddByIndex}
            type={"button"}
            text={"Добавить по индексу"}
            extraClass={styles.form__button_type_index}

            // onClick={handleAddByIndex}
          />
          <Button
            text={"Удалить по индексу"}
            extraClass={styles.form__button_type_index}
          />
        </fieldset>
      </form>
      <ul className={styles.wrapper}>
        {valuesArray.length > 0 ? (
          valuesArray.map((item: any, index: number) => (
            <li className={styles.wrapper_element} key={index}>
              <Circle
              //insert your dick here
              />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </SolutionLayout>
  );
};
/* {!(array.length - 1 === index) && (
                <ArrowIcon
                  fill={
                    changingIndex &&
                    solutionState === LinkedListStateVariety.AddByIndex &&
                    index < changingIndex
                      ? COLOR_CHANGING
                      : COLOR_DEFAULT
                  }
                />
              )} */

/*

                state={findState(item, index)}
                tail={setTail(item, index)}
                head={setHead(item, index, inputValue)}
                index={index}
                letter={findCircleValue(item, index)}

              */
