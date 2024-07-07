/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from "react";

type FormState = {
  [key: string]: any;
};

type InitialForm = {
  [key: string]: any;
};

type FormHookReturnType = {
  [key: string]: any;
  formState: FormState;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetForm: () => void;
};

export const useForm = (initialForm: InitialForm = {}): FormHookReturnType => {
  const [formState, setFormState] = useState<FormState>(initialForm);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState, // enviar los campos del formulario al componente que lo llama
    formState,
    onInputChange,
    onResetForm,
  };
};
