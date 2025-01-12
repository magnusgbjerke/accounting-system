"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Separator } from "./ui/separator";

export const HelpButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="ghost">
          <CircleHelp />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hjelp</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <DotLottieReact
          src="/Animation - 1736189152760.lottie"
          autoplay
          className="w-3/4 mx-auto"
        />
        <Separator orientation="horizontal" />
        <h2>Spørsmål?</h2>
        <p>Send meg gjerne en mail:</p>
        <p>
          <strong> magnusgbjerke@gmail.com</strong>
        </p>
      </DialogContent>
    </Dialog>
  );
};
