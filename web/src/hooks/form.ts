import { useState, useCallback, ChangeEvent } from 'react';

interface IForm<T> {
  values: T;
  handleChange(
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void;
  clear(): void;
}

export function useForm<T>(initialValues: T): IForm<T> {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback(
    (
      evt: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const newFormValues = { ...values, [evt.target.name]: evt.target.value };

      setValues(newFormValues);
    },
    [values]
  );

  const clear = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    clear,
  };
}
