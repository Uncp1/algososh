import { FC, ReactEventHandler, useEffect, useMemo, useState } from "react";
import styles from "./lsit-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../helpers/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { LinkedList, LinkedListNode } from "./linked-list";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import {
  ElementStates,
  ElementStatesType,
  LinkedListStates,
  LinkedListStateType,
} from "../../types/states";

export const ListPage: FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [valuesArray, setValuesArray] = useState<LinkedListNode<string>[]>([]);
  const [initArray] = useState<string[]>(["0", "34", "8", "1"]);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isIndexInSearch, setIsIndexInSearch] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState<LinkedListStateType>(
    LinkedListStates.Empty
  );

  const list = useMemo(() => new LinkedList<string>(), []);

  useEffect(() => {
    list.fromArray(initArray);
    setValuesArray(list.toArray());
    return () => list.reset();
  }, [initArray, list]);

  const handleAddNewHead: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsFormSubmitting(true);
    setAnimationState(LinkedListStates.AddToHead);
    setActiveIndex(0);
    await delay(DELAY_IN_MS);
    setActiveIndex(0);
    list.prepend(value);
    setValuesArray(list.toArray());
    setAnimationState(LinkedListStates.Success);
    await delay(DELAY_IN_MS);
    setValue("");
    setAnimationState(LinkedListStates.Empty);
    setActiveIndex(null);
    setIsFormSubmitting(false);
  };

  const handleAddNewTail: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsFormSubmitting(true);
    setAnimationState(LinkedListStates.AddToTail);
    setActiveIndex(valuesArray.length - 1);
    await delay(DELAY_IN_MS);
    setActiveIndex(valuesArray.length);
    list.append(value);
    setValuesArray(list.toArray());
    setAnimationState(LinkedListStates.Success);
    await delay(DELAY_IN_MS);
    setValue("");
    setAnimationState(LinkedListStates.Empty);
    setActiveIndex(null);
    setIsFormSubmitting(false);
  };

  const handleDeleteHead: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsFormSubmitting(true);
    setAnimationState(LinkedListStates.DeleteFromHead);
    setActiveIndex(0);
    await delay(DELAY_IN_MS);
    list.deleteHead();
    setValuesArray(list.toArray());
    setActiveIndex(null);
    setAnimationState(LinkedListStates.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteTail: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsFormSubmitting(true);
    setAnimationState(LinkedListStates.DeleteFromTail);
    setActiveIndex(valuesArray.length - 1);
    await delay(DELAY_IN_MS);
    list.deleteTail();
    setValuesArray(list.toArray());
    setActiveIndex(null);
    setAnimationState(LinkedListStates.Empty);
    setIsFormSubmitting(false);
  };

  const handleAddByIndex: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsFormSubmitting(true);
    setAnimationState(LinkedListStates.AddByIndex);
    const addIndex = Number(index);
    setActiveIndex(addIndex);
    setIsIndexInSearch(true);
    let i = 0;
    while (i <= addIndex) {
      setActiveIndex(i);
      await delay(DELAY_IN_MS);
      i++;
    }
    list.addByIndex(value, addIndex);
    setValuesArray(list.toArray());
    setAnimationState(LinkedListStates.Success);
    await delay(DELAY_IN_MS);
    setValue("");
    setIndex("");
    setActiveIndex(null);
    setIsIndexInSearch(false);
    setAnimationState(LinkedListStates.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteByIndex: ReactEventHandler<
    HTMLButtonElement
  > = async () => {
    setIsFormSubmitting(true);
    setAnimationState(LinkedListStates.DeleteByIndex);
    const delIndex = Number(index);
    setActiveIndex(delIndex);
    setIsIndexInSearch(true);
    let i = 0;
    while (i <= delIndex) {
      setActiveIndex(i);
      await delay(DELAY_IN_MS);
      i++;
    }
    list.deleteByIndex(delIndex);
    setValuesArray(list.toArray());
    setValue("");
    setIndex("");
    setActiveIndex(null);
    setIsIndexInSearch(false);
    setAnimationState(LinkedListStates.Empty);
    setIsFormSubmitting(false);
  };

  const renderCircleValue = (
    item: LinkedListNode<string>,
    itemIndex: number
  ) => {
    if (value && itemIndex === activeIndex) return item.value;
    if (itemIndex === activeIndex) return "";
    return item.value;
  };

  const findState = (itemIndex: number): ElementStatesType => {
    if (activeIndex && isIndexInSearch && itemIndex < activeIndex) {
      return ElementStates.Changing;
    }
    if (
      animationState === LinkedListStates.Success &&
      itemIndex === activeIndex
    ) {
      console.log(itemIndex);

      return ElementStates.Modified;
    }
    return ElementStates.Default;
  };

  const findHead = (itemIndex: number) => {
    if (
      itemIndex === activeIndex &&
      (animationState === LinkedListStates.AddToHead ||
        animationState === LinkedListStates.AddToTail ||
        animationState === LinkedListStates.AddByIndex)
    ) {
      return (
        <Circle state={ElementStates.Changing} isSmall={true} letter={value} />
      );
    } else if (itemIndex === 0) {
      return "head";
    } else {
      return "";
    }
  };

  const findTail = (itemIndex: number) => {
    if (
      itemIndex === activeIndex &&
      (animationState === LinkedListStates.DeleteFromHead ||
        animationState === LinkedListStates.DeleteFromTail ||
        animationState === LinkedListStates.DeleteByIndex)
    ) {
      return (
        <Circle state={ElementStates.Changing} isSmall={true} letter={value} />
      );
    } else if (itemIndex === valuesArray.length - 1) {
      return "tail";
    } else {
      return "";
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <fieldset className={styles.form__fieldset}>
          <Input
            disabled={isFormSubmitting || valuesArray.length >= 7}
            value={value}
            maxLength={4}
            isLimitText={true}
            onChange={(e) => setValue(e.currentTarget.value)}
            extraClass={styles.form__input}
            placeholder={"Введите значение"}
          />
          <Button
            disabled={isFormSubmitting || !value}
            isLoader={animationState === LinkedListStates.AddToHead}
            type={"button"}
            text={"Добавить в head"}
            extraClass={`${styles.form_button}`}
            onClick={handleAddNewHead}
          />
          <Button
            disabled={isFormSubmitting || !value}
            isLoader={animationState === LinkedListStates.AddToTail}
            type={"button"}
            text={"Добавить в tail"}
            extraClass={styles.form_button}
            onClick={handleAddNewTail}
          />
          <Button
            disabled={isFormSubmitting || valuesArray.length <= 0}
            isLoader={animationState === LinkedListStates.DeleteFromHead}
            type={"button"}
            text={"Удалить из head"}
            extraClass={`${styles.form_button}`}
            onClick={handleDeleteHead}
          />
          <Button
            disabled={isFormSubmitting || valuesArray.length <= 0}
            isLoader={animationState === LinkedListStates.DeleteFromTail}
            type={"button"}
            text={"Удалить из tail"}
            extraClass={styles.form_button}
            onClick={handleDeleteTail}
          />
        </fieldset>
        <fieldset className={styles.form__fieldset}>
          <Input
            disabled={isFormSubmitting}
            value={index}
            onChange={(e) => setIndex(e.currentTarget.value)}
            min={0}
            max={valuesArray.length > 1 ? valuesArray.length - 1 : " 0 "}
            type={"number"}
            extraClass={styles.form__input}
            placeholder={"Введите индекс"}
          />
          <Button
            disabled={
              !value ||
              !index ||
              isFormSubmitting ||
              Number(index) >= valuesArray.length
            }
            isLoader={animationState === LinkedListStates.AddByIndex}
            type={"button"}
            text={"Добавить по индексу"}
            extraClass={styles.form__button_type_index}
            onClick={handleAddByIndex}
          />
          <Button
            disabled={
              !index ||
              isFormSubmitting ||
              valuesArray.length === 0 ||
              Number(index) >= valuesArray.length
            }
            isLoader={animationState === LinkedListStates.DeleteByIndex}
            type={"button"}
            text={"Удалить по индексу"}
            extraClass={styles.form__button_type_index}
            onClick={handleDeleteByIndex}
          />
        </fieldset>
      </form>
      <ul className={styles.wrapper}>
        {valuesArray.length > 0 ? (
          valuesArray.map((item: LinkedListNode<string>, index: number) => (
            <li className={styles.wrapper__circle} key={index}>
              <Circle
                letter={renderCircleValue(item, index)}
                index={index}
                state={findState(index)}
                tail={findTail(index)}
                head={findHead(index)}
              />
              {!(valuesArray.length - 1 === index) && (
                <ArrowIcon
                  fill={
                    isIndexInSearch && activeIndex && index < activeIndex
                      ? "#d252e1"
                      : "#0032ff"
                  }
                />
              )}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </SolutionLayout>
  );
};
