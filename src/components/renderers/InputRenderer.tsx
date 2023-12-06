import React, { useId } from "react";
import { withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith, ControlProps, uiTypeIs } from "@jsonforms/core";
// import { withIdProp } from "@/components/renderers/withIdProp";
// import { AriaTextFieldProps, useFocusRing, useHover, useTextField, mergeProps } from "react-aria";
import { clsx } from "clsx";

import {TextField, Label, Input, Text, FieldError} from 'react-aria-components';
import { useShowErrors } from "@/components/renderers/useShowErrors";

const InputControl = (props: ControlProps) => {
  const {
    handleChange,
    path,
    enabled,
    visible,
    label,
    data,
    errors,
    required,
    uischema,
    config,
    description,
  } = props;

  const { isInvalid, onBlur } = useShowErrors(errors, config);

  return (
    <TextField
      className="flex gap-4"
      isInvalid={isInvalid}
      value={data ?? ''}
      name={path}
      type={uischema.options?.type ?? 'text'}
      onChange={(value) => handleChange(path, value === '' ? undefined : value)}
      onBlur={onBlur}
    >
      {label && (
        <Label>{label}</Label>
      )}
      <Input className="border data-[focused]:ring" />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>
        {errors}
      </FieldError>
    </TextField>
  );
};

export const InputRenderer = withJsonFormsControlProps(InputControl);

export const inputTester = rankWith(10, uiTypeIs('InputControl'));
