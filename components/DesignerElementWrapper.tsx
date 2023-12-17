import { Fragment, useState } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { cn } from "@/lib/utils";

export default function DesignerElementWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
  const { removeElement } = useDesigner();

  const DesignerElement = FormElements[element.type].designerComponent;

  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      <div
        className="absolute w-full h-1/2 rounded-t-md"
        ref={topHalf.setNodeRef}
      />
      <div
        className="absolute w-full h-1/2 rounded-b-md bottom-0"
        ref={bottomHalf.setNodeRef}
      />
      {mouseIsOver && (
        <Fragment>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={() => removeElement(element.id)}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </Fragment>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md rounded-b-none h-[5px] bg-primary" />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-10",
          bottomHalf.isOver && "border-b-4 border-b-foreground"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md rounded-t-none h-[5px] bg-primary" />
      )}
    </div>
  );
}
