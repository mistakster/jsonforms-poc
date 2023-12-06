import React, { useId } from "react";
import { DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith, isStringControl, ControlProps, uiTypeIs } from "@jsonforms/core";
import { withIdProp } from "@/components/renderers/withIdProp";
import { useShowErrors } from "@/components/renderers/useShowErrors";
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";

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
  } = props;

  const { isInvalid, onBlur } = useShowErrors(errors, config);

  return (
    <Select
      className="flex gap-4"
      isInvalid={isInvalid}
      selectedKey={data ?? ''}
      name={path}
      onSelectionChange={(key) => handleChange(path, key)}
      onBlur={onBlur}
    >
      {label && (
        <Label>{label}</Label>
      )}
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox>
          <ListBoxItem id="">{' '}</ListBoxItem>
          {schema.oneOf?.map(item => (
            <ListBoxItem key={item.const} id={item.const}>{item.title}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export const SelectRenderer = withJsonFormsControlProps(SelectControl);

export const selectTester = rankWith(10, uiTypeIs('SelectControl'));
