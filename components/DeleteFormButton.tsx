"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { BiTrashAlt } from "react-icons/bi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertTitle } from "./ui/alert";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { DeleteForm } from "@/app/actions/form";
import { FaSpinner } from "react-icons/fa";

function DeleteFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const deleteForm = async () => {
    try {
      await DeleteForm(id);
      toast({
        title: "Success",
        description: "Your form has been deleted",
      });
      router.refresh();
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Something went worng",
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full mt-2 text-muted gap-4"
          variant={"destructive"}
        >
          Delete this form <BiTrashAlt className="" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertTitle>Are you absolutelt sure?</AlertTitle>
          <AlertDialogDescription>
            This action cannot be undone. After deleting you will not be able to
            recover.
            <br />
            <br />
            <span className="font-medium">
              By deleting this form you will make it un-available to the public
              and you will be not able to see submissions (Action is
              irreverseible)
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(deleteForm);
            }}
            className="bg-red-400 hover:bg-red-500"
          >
            {" "}
            Proceed {loading && <FaSpinner className="animate-spin ml-1" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteFormButton;
