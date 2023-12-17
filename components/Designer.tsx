"use client";
import React from "react";
import DesignerSidebar from "./DesignerSidebar";

function Designer() {
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
          <p className="flex text-3xl text-muted-foreground flex-grow items-center font-bold">
            Drop Here
          </p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

export default Designer;
