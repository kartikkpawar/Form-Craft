import React from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";

function SaveFormBtn() {
  return (
    <Button className="gap-2" variant={"outline"}>
      <HiSaveAs className="h-4 w-4" />
      Preview
    </Button>
  );
}

export default SaveFormBtn;
