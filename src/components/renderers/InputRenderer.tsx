import React, { useId } from "react";
import { DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith, isStringControl, ControlProps, uiTypeIs } from "@jsonforms/core";
import { withIdProp } from "@/components/renderers/withIdProp";

interface InputControlProps extends ControlProps {
  onBlur: () => void;
  touched: boolean;
}

const InputControl = (props: InputControlProps) => {
  const {
    handleChange,
    path,
    id,
    enabled,
    visible,
    label,
    data,
    errors,
    required,
    schema,
    uischema,
    rootSchema,
    cells,
    renderers,
    config,
    i18nKeyPrefix,
    description,
    onBlur,
    touched
  } = props;

  const controlId = useId();

  return (
    <div className="flex gap-2" onBlur={() => console.log('blur')} onFocus={() => console.log('focus')}>
      {label && (
        <label htmlFor={id} className="whitespace-nowrap">{label}</label>
      )}
      <input
        id={id}
        name={path}
        className="border"
        type={uischema.options?.type ?? 'text'}
        onBlur={onBlur}
        onChange={e => handleChange(path, e.target.value === '' ? undefined : e.target.value)}
        value={data ?? ''}
      />
      {(touched || config.touched) && (
        <div>
          {JSON.stringify(errors)}
        </div>
      )}
    </div>
  );
};

export const InputRenderer = withJsonFormsControlProps(withIdProp(InputControl));

export const inputTester = rankWith(10, uiTypeIs('InputControl'));
