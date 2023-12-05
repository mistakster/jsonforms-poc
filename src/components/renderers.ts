import { JsonFormsCellRendererRegistryEntry, JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { LayoutRenderer, layoutTester } from "@/components/renderers/LayoutRenderer";
import { InputRenderer, inputTester } from "@/components/renderers/InputRenderer";
import { SelectRenderer, selectTester } from "@/components/renderers/SelectRenderer";

export const renderers: JsonFormsRendererRegistryEntry[] = [
  {
    tester: layoutTester,
    renderer: LayoutRenderer
  },
  {
    tester: inputTester,
    renderer: InputRenderer
  },
  {
    tester: selectTester,
    renderer: SelectRenderer
  }
];

export const cells: JsonFormsCellRendererRegistryEntry[] = [];
