import { StatePropsOfRenderer, UISchemaElement } from "@jsonforms/core";

export type StrictStatePropsOfRenderer<BaseStateProps extends StatePropsOfRenderer, Options extends object> =
  Omit<BaseStateProps, 'uischema'> & {
  uischema: StrictUISchemaElement<Options>;
};

export type StrictUISchemaElement<Options extends object> = Omit<UISchemaElement, 'options'> & {
  options?: Options;
};
