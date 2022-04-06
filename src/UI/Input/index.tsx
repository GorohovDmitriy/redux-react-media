import { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type,
  placeholder,
  className,
  onChange,
  value,
}) => (
  <input
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    className={className}
  />
);

export default Input;
