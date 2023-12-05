import React, { useId } from "react";
import { DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith, isStringControl, ControlProps, uiTypeIs } from "@jsonforms/core";
import { withIdProp } from "@/components/withIdProp";
import { valueOf } from "clsx";

interface SelectControlProps extends ControlProps {
}

const SelectControl = (props: SelectControlProps) => {
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
    <div className="flex gap-2">
      {label && (
        <label htmlFor={id} className="whitespace-nowrap">{label}</label>
      )}
      <select
        id={id}
        name={path}
        className="border"
        onChange={e => handleChange(path, e.target.selectedIndex === 0 ? undefined : e.target.value)}
        onBlur={onBlur}
        value={data}
      >
        <option value=""/>
        {schema.oneOf?.map(item => (
          <option key={item.const} value={item.const}>{item.title}</option>
        ))}
      </select>
      {(touched || config.touched) && (
        <div>
          {JSON.stringify(errors)}
        </div>
      )}
    </div>
  );
};

export const SelectRenderer = withJsonFormsControlProps(withIdProp(SelectControl));

export const selectTester = rankWith(10, uiTypeIs('SelectControl'));
