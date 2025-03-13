import React, { createContext, useContext, useState } from "react";
import { MultiSlideSchema } from "../validation/slide-schema";

import { z } from "zod";

interface GenerateCarouselContextType {
  generateCarousel: (topic: string) => Promise<z.infer<typeof MultiSlideSchema> | null>;
  isGenerating: boolean;
  error: string | null;
}

const GenerateCarouselContext = createContext<GenerateCarouselContextType | undefined>(undefined);

interface GenerateCarouselProviderProps {
  children: React.ReactNode;
  onGenerate: (topic: string) => Promise<z.infer<typeof MultiSlideSchema> | null>;
}

export function GenerateCarouselProvider({ children, onGenerate }: GenerateCarouselProviderProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCarousel = async (topic: string) => {
    try {
      setIsGenerating(true);
      setError(null);
      
      return await onGenerate(topic);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <GenerateCarouselContext.Provider value={{ generateCarousel, isGenerating, error }}>
      {children}
    </GenerateCarouselContext.Provider>
  );
}

export function useGenerateCarousel() {
  const context = useContext(GenerateCarouselContext);
  if (context === undefined) {
    throw new Error("useGenerateCarousel must be used within a GenerateCarouselProvider");
  }
  return context;
} 