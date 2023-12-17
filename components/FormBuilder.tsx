"use client";
import { Form } from "@prisma/client";
import React, { Fragment } from "react";
import PreviewDialogButton from "./PreviewDialogButton";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";

function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className="flex flex-col w-full ">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">
              Form: {form.name}
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <Fragment>
                <SaveFormBtn />
                <PublishFormBtn />
              </Fragment>
            )}
          </div>
        </nav>
        <div className="flex w-full items-center justify-center flex-grow relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
    </DndContext>
  );
}

export default FormBuilder;
