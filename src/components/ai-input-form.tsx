"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Sparkles } from "lucide-react";
import { DocumentFormReturn } from "../lib/document-form-types";
import { useState } from "react";
import { LoadingSpinner } from "./loading-spinner";
import { useKeysContext } from "../lib/providers/keys-context";
import { useStatusContext } from "../lib/providers/editor-status-context";
import { useGenerateCarousel } from "../lib/providers/generate-carousel-context";

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt must be at least 2 characters.",
  }),
});

export function AIInputForm() {
  const { setValue }: DocumentFormReturn = useFormContext(); // retrieve those props
  const [isLoading, setIsLoading] = useState(false);
  const { setStatus } = useStatusContext();
  const { generateCarousel } = useGenerateCarousel();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setStatus("loading");

  const generatedSlides = await generateCarousel(data.prompt);

    // const generatedSlides = await generateCarouselSlidesAction(
    //   `A carousel with about "${data.prompt}"`
    // );

    // const generatedSlides = await generateCarouselSlides(
    //   `A carousel with about "${data.prompt}"`,
    //   apiKey
    // );
    if (generatedSlides) {
      setValue("slides", generatedSlides);
      // TODO Fix toast not working
      toast({
        title: "New carousel generated",
      });
    } else {
      toast({
        title: "Failed to generate carousel",
      });
    }
    setStatus("ready");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg w-full m-auto"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <div className="flex flex-row gap-2 items-center w-full">
                  <Input
                    placeholder="What's your carousel about"
                    {...field}
                    className="flex-1"
                  />
                  <Button type="submit" className="flex-0">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <span className="flex flex-row gap-1.5">
                        {" "}
                        <Sparkles className="w-4 h-4" /> Generate{" "}
                      </span>
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
