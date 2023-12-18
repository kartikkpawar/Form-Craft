import React from "react";
import { TextFiledFormElement } from "./fields/TextField";

export type ElementsType = "TextFiled";

export type FormElement = {
  type: ElementsType;

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  formComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementType = {
  TextFiled: TextFiledFormElement,
};
