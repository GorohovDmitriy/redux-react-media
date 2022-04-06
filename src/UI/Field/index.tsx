import { FC, InputHTMLAttributes, ReactNode } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  svg: ReactNode;
}

const Field: FC<FieldProps> = ({ type, onChange, accept, className, svg }) => (
  <label className={className}>
    <input type={type} accept={accept} onChange={onChange} />
    {svg}
  </label>
);

export default Field;
