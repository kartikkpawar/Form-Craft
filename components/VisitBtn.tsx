"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function VisitBtn({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = useState<boolean>();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  return (
    <Button className="w-[200px]" asChild>
      <Link href={shareLink} target="_blank">
        Visit
      </Link>
    </Button>
  );
}

export default VisitBtn;
