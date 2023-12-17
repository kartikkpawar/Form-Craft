import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

function PublishFormBtn() {
  return (
    <Button className="gap-2" variant={"outline"}>
      <MdOutlinePublish className="h-4 w-4" />
      Publish
    </Button>
  );
}

export default PublishFormBtn;
