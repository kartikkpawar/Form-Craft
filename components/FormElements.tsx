import React from "react";
import { TextFiledFormElement } from "./fields/TextField";

export type ElementsType = "TextFiled";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;

  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  construct: (id: string) => FormElementInstance;

  validate: (FormElement: FormElementInstance, currentValue: string) => boolean;

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
