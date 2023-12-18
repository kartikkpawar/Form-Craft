import React, { Fragment } from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FormElements } from "./FormElements";

function PreviewDialogButton() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant={"outline"}>
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="bg-accent flex flex-grow items-center justify-center p-4 g-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col flex-grow bg-background h-full w-full rounded-3xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogButton;
