import * as React from "react";
// import Link from "next/link";

import { cn } from "../lib/utils";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { EditorMenubar } from "./editor-menubar";
import { Download, Loader2Icon, Settings } from "lucide-react";
import Pager from "./pager";
import { FilenameForm } from "./forms/filename-form";
import { StarOnGithub } from "./star-on-github";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

interface MainNavProps {
  handlePrint: () => void;
  isPrinting: boolean;
  className?: string;
}

export function MainNav({ handlePrint, isPrinting, className }: MainNavProps) {
  return (
    <div
      className={cn(
        "gap-4 md:gap-10 justify-between items-center",
        className
      )}
    >
      {/* <div className="flex gap-4">
        <a href="/" className="items-center space-x-2 flex">
          <Icons.logo />
          <span className="hidden font-bold md:inline-block">
            Carousel Generator
          </span>
        </a>
        <EditorMenubar />
      </div> */}
      <div className="mt-2 relative">
        <div className="hidden md:flex flex-col items-center justify-between">
          <Pager />
        </div>
        <div className="absolute right-0 top-0 flex gap-2 items-center">
        <div className="hidden md:block">
          <FilenameForm />
        </div>
        <Button variant="ghost" size={"icon"} onClick={() => handlePrint()}>
          <div className="flex flex-row gap-1 items-center">
            {isPrinting ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <Download />
            )}
          </div>
        </Button>
        {/* <StarOnGithub /> */}
        {/* <a
          className="block lg:hidden"
          href={"https://github.com/FranciscoMoretti/carousel-generator"}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-9 px-0"
            )}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </div>
        </a> */}
        {/* // TODO: Re-enable your own keys system  */}
        {/* <BringYourKeysDialog
          triggerButton={
            <Button variant="ghost" size={"icon"}>
              <div className="flex flex-row gap-1 items-center">
                <Settings />
              </div>
            </Button>
          }
        /> */}
      </div>
      </div>
    </div>
  );
}
