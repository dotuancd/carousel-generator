import { useFieldArray, useFormContext } from "react-hook-form";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "../lib/document-form-types";
import { Document } from "./pages/document";
import useWindowDimensions from "../lib/hooks/use-window-dimensions";
import { SIZE } from "../lib/page-size";
import { usePagerContext } from "../lib/providers/pager-context";
import { useFieldArrayValues } from "../lib/hooks/use-field-array-values";
import { useSelectionContext } from "../lib/providers/selection-context";
import { AIPanel } from "./ai-panel";
import { useEffect } from "react";
import { useStatusContext } from "../lib/providers/editor-status-context";
import { DocumentSkeleton } from "./editor-skeleton";

interface SlidesEditorProps {}

export function SlidesEditor({}: SlidesEditorProps) {
  const form: DocumentFormReturn = useFormContext();
  const { control, watch } = form;
  const document = watch();
  const { width } = useWindowDimensions();
  const windowWidth = width || 0;
  const isLoadingWidth = !windowWidth;
  const { currentPage, onPreviousClick, onNextClick, setCurrentPage } =
    usePagerContext();
  const { numPages } = useFieldArrayValues("slides");
  const slidesFieldArray: SlidesFieldArrayReturn = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "slides", // unique name for your Field Array
  });
  const { setCurrentSelection } = useSelectionContext();
  const { status, setStatus } = useStatusContext();

  useEffect(() => {
    setStatus("ready");
  }, [setStatus]);

  // Screen with larger than md side have smaller slides because the sidebar is present
  const mdWindowWidthPx = 770;
  const screenToSlideMinRatio = windowWidth > mdWindowWidthPx ? 2.5 : 1.2;
  const scale = Math.min(1, windowWidth / screenToSlideMinRatio / SIZE.width);

  return (
    <div
      className="flex flex-col w-full items-center justify-start bg-muted/20 flex-1 h-full"
      // TODO: When background gets clicked element gets unselected
      onClick={(event) => {
        // Only clear selection if this element started the event
        setCurrentSelection("", event);
      }}
    >
      <div className=" flex flex-col p-4 w-full h-full items-center justify-start gap-8 font-mono text-sm bg-primary/10">
        <div className="w-full px-4 py-10">
          {isLoadingWidth || status == "loading" ? (
            <DocumentSkeleton />
          ) : (
            <Document
              document={document}
              slidesFieldArray={slidesFieldArray}
              scale={scale}
            />
          )}
        </div>
        <AIPanel />
      </div>
    </div>
  );
}
