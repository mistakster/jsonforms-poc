import React, { useId, useMemo } from "react";
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

  const items = useMemo(() => {
    const result = (schema.oneOf ?? []).map(item => ({
      id: item.const,
      name: item.title
    }));

    result.unshift({
      id: -Infinity,
      name: '\u00A0'
    });

    return result;
  }, [schema.oneOf]);

  return (
    <Select
      className="flex gap-4"
      isInvalid={isInvalid}
      selectedKey={data ?? ''}
      name={path}
      onSelectionChange={(key) => handleChange(path, key === -Infinity ? undefined : key)}
      onBlur={onBlur}
    >
      {label && (
        <Label>{label}</Label>
      )}
      <Button className="min-w-[200px]">
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox items={items}>
          {(item) => (
            <ListBoxItem>{item.name}</ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};

export const SelectRenderer = withJsonFormsControlProps(SelectControl);

export const selectTester = rankWith(10, uiTypeIs('SelectControl'));
