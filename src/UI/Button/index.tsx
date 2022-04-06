import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import "./index.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({ text, className, onClick, icon }) => (
  <button className={`button ${className}`} onClick={onClick}>
    {icon} {text}
  </button>
);

export default Button;
