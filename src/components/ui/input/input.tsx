import React from "react";
import styles from "./input.module.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder = "Введите текст",
  extraClass = "",
  type = "text",
  maxLength,
  max,
  isLimitText = false,
  ...rest
}) => {
  let limitText;

  switch (type) {
    case "text":
      limitText = `Максимум — ${maxLength} символов`;
      break;
    case "textAltEndind":
      limitText = `Максимум — ${maxLength} символа`;
      break;
    default:
      limitText = `Максимальное число — ${max}`;
      break;
  }

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text_type_input text_color_input`}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        max={max}
        {...rest}
      />
      {isLimitText && (
        <span
          className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
        >
          {limitText}
        </span>
      )}
    </div>
  );
};
