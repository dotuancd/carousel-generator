import { TypographyH3 } from "./typography";
import { Sparkles } from "lucide-react";
import { NoApiKeysText } from "./no-api-keys-text";
import { AIInputForm } from "./ai-input-form";

export function AIPanel() {
  // const { apiKey } = useKeysContext();
  const apiKey = true; // TODO: Re-enable local keys
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <TypographyH3 className="flex flex-row items-center gap-2">
        <Sparkles className="w-6 h-6" /> Generate with AI
      </TypographyH3>
      {apiKey ? (
        <>
          <AIInputForm />
        </>
      ) : (
        <NoApiKeysText />
      )}
    </div>
  );
}
