import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";

function FormElementsSidebar() {
  return (
    <div>
      Elements
      <SidebarBtnElement formElement={FormElements.TextFiled} />
    </div>
  );
}

export default FormElementsSidebar;
