"use client";

import { SidebarPanel } from "./settings-panel";
import { SlidesEditor } from "./slides-editor";
import React from "react";
import { useComponentPrinter } from "../lib/hooks/use-component-printer";
import { RefProvider } from "../lib/providers/reference-context";
import { GenerateCarouselProvider } from "../lib/providers/generate-carousel-context";
import { MainNav } from "./main-nav";
import { MultiSlideSchema } from "../lib/validation/slide-schema";
import { z } from "zod";

interface EditorProps {
  generateCarousel: (topic: string) => Promise<z.infer<typeof MultiSlideSchema> | null>;
}

export default function Editor({ generateCarousel }: EditorProps) {
  const { componentRef, handlePrint, isPrinting } = useComponentPrinter();

  return (
    <GenerateCarouselProvider onGenerate={generateCarousel}>
      <RefProvider myRef={componentRef}>
        <div className="flex-1 flex flex-col">
          <MainNav
            className="h-14 border-b px-6 "
            handlePrint={handlePrint}
            isPrinting={isPrinting}
          />
          <div className="flex-1 flex flex-start  md:grid md:grid-cols-[320px_minmax(0,1fr)] ">
            <SidebarPanel />
            <SlidesEditor />
          </div>
        </div>
      </RefProvider>
    </GenerateCarouselProvider>
  );
}
