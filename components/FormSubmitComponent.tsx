"use client";
import React, {
  Fragment,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/app/actions/form";

function FormSubmitComponent({
  formURL,
  content,
}: {
  formURL: string;
  content: FormElementInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please check the forms for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formURL, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div
          key={renderKey}
          className="max-w-[620px] flex flex-col gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-500 rounded"
        >
          <h1 className="text-2xl font-bold"> Form Submitted</h1>
          <p className="text-muted-foreground">
            Thankyou for submitting form you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-500 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              elementInstance={element}
              key={element.id}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => startTransition(submitForm)}
          disabled={pending}
        >
          {pending ? (
            <ImSpinner2 className="animate-spin" />
          ) : (
            <Fragment>
              <HiCursorClick className="mr-2" />
              Submit
            </Fragment>
          )}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
