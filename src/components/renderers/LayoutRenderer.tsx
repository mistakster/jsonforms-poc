import { clsx } from 'clsx';
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import { isLayout, LayoutProps, rankWith, uiTypeIs } from '@jsonforms/core';
import { StrictStatePropsOfRenderer } from "@/components/renderers/types";

export const layoutTester = rankWith(10, uiTypeIs('Layout'));

type LayoutRendererComponentProps = StrictStatePropsOfRenderer<LayoutProps, {
  className?: string;
  itemClassName?: string;
}>;

const LayoutRendererComponent = (props: LayoutRendererComponentProps) => {
  const {
    uischema,
    schema,
    path,
    visible,
    renderers,
    enabled,
    cells,
    direction
  } = props;

  if (!isLayout(uischema)) {
    return null;
  }

  const className = clsx(
    'flex',
    direction === 'row' ? 'flex-row' : 'flex-col',
    'gap-4',
    uischema.options?.className
  );

  return (
    <div className={className}>
      {visible &&
        uischema.elements.map((child, index) => (
          <div key={index} className={uischema.options?.itemClassName}>
            <JsonFormsDispatch
              schema={schema}
              uischema={child}
              path={path}
              enabled={enabled}
              renderers={renderers}
              cells={cells}
            />
          </div>
        ))}
    </div>
  );
};

export const LayoutRenderer = withJsonFormsLayoutProps(LayoutRendererComponent);
