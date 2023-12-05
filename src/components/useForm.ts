import { FormEventHandler, useCallback, useState } from 'react';
import { JsonFormsCore } from "@jsonforms/core";

type UseFormOptions = {
  initialData?: any;
}

type ChangePayload = Pick<JsonFormsCore, 'data' | 'errors'>;

export function useForm(options?: UseFormOptions) {
  const [{ data, errors }, handleChange] = useState<ChangePayload>({
    data: options?.initialData ?? undefined,
    errors: undefined
  });
  const [isTouched, setTouched] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (callback: typeof data): FormEventHandler<HTMLFormElement> => {
      return (e) => {
        e.preventDefault();
        e.stopPropagation();

        setTouched(true);

        if (!Array.isArray(errors) || errors.length < 1) {
          setSubmitting(true);

          Promise
            .resolve(callback(data))
            .catch(() => {
            })
            .then(() => {
              setSubmitting(false);
            });
        }
      }
    },
    [data, errors, setSubmitting]
  );

  return {
    isTouched,
    isSubmitting,
    data,
    errors,
    handleChange,
    handleSubmit,
  };
}
