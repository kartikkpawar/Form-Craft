"use client";

import { ElementsType, FormElement } from "../FormElements";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextFiled";

export const TextFiledFormElement: FormElement = {
  type,
  designerComponent: () => <div>Designer Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
  formComponent: () => <div>Form Component</div>,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper Text",
      required: false,
      placholder: "Placeholder value here",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
};
