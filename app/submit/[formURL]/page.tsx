import { GetFormContentByURL } from "@/app/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    formURL: string;
  };
}) {
  const form = await GetFormContentByURL(params.formURL);
  if (!form) {
    throw new Error("Form Not Found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formURL={params.formURL} content={formContent} />;
}

export default SubmitPage;
