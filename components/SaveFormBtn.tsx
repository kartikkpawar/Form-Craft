import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/app/actions/form";
import { toast } from "./ui/use-toast";
import { FaSpinner } from "react-icons/fa";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();

  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went worng",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      className="gap-2"
      variant={"outline"}
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      <HiSaveAs className="h-4 w-4" />
      {loading ? <FaSpinner className="animate-spin" /> : "Save"}
    </Button>
  );
}

export default SaveFormBtn;
