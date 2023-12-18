import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { AiOutlineClose } from "react-icons/ai";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForms =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <PropertiesForms elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesFormSidebar;
