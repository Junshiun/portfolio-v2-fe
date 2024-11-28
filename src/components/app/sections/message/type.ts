import { ChangeEvent } from "react";

export type TFormData = {
  name: "";
  email: "";
  title: "";
  message: "";
};

export type TInputInfo = {
  type: string;
  label: string;
  required?: boolean;
  name: keyof TFormData;
  placeholder?: string;
};

export type TInputFieldProps = {
  formData: TFormData;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  info: TInputInfo;
};
