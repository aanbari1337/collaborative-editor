import React from "react";
import Input from "./input";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange?: () => void;
  props: any;
}

const FormField = ({
  label,
  value,
  onChange,
  type,
  ...props
}: FormFieldProps) => {
  return (
    <label htmlFor={props.name} className='capitalize text-base text-gray-600'>
      {label}
      <Input value={value} onChange={onChange} type={type} {...props} />
    </label>
  );
};

export default FormField;
