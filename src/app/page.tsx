"use client";

import Editor from "../components/editor";
import { DocumentProvider } from "../lib/providers/document-provider";
import { generateCarouselSlidesAction } from "./actions";

export default function Home() {
  return (
    <div className="flex-1 h-full min-h-full flex flex-col justify-stretch">
      <DocumentProvider>
        <Editor generateCarousel={generateCarouselSlidesAction} />
      </DocumentProvider>
    </div>
  );
}
