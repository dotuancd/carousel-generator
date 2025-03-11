import React from "react";
import { cn } from "../../lib/utils";

export function BackgroundLayer({
  background,
  className = "",
  style,
}: {
  background: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        backgroundColor: background,
        ...style
      }}
      className={cn(
        "w-full h-full absolute top-0 left-0 right-0 bottom-0",
        className
      )}
    ></div>
  );
}
