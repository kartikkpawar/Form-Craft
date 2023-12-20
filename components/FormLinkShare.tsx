"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { ImShare } from "react-icons/im";

function FormLinkShare({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = useState<boolean>();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input className="w-full" readOnly value={shareLink} />
      <Button
        className="mt-2 w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareURL);
          toast({
            title: "Copied!",
            description: "Linkk copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;
