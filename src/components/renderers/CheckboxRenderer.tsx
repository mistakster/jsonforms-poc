import { withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith, ControlProps, isBooleanControl } from "@jsonforms/core";
import { withIdProp } from "@/components/renderers/withIdProp";

interface CheckboxControlProps extends ControlProps {
}

const CheckboxControl = (props: CheckboxControlProps) => {
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
    description
  } = props;

  return (
    <div className="flex gap-4">
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      <input
        id={id}
        type="checkbox"
        name={path}
        onChange={(e) => handleChange(path, e.target.value)}
      />
    </div>
  );
};

export const CheckboxRenderer = withJsonFormsControlProps(withIdProp(CheckboxControl));

export const checkboxTester = rankWith(10, isBooleanControl);
