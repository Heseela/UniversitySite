import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ECtaVariant } from "../../../../../../types/blocks.types";
import { Plus } from "lucide-react";
import CtaAccordion from "../common/cta-accordion";
import { BlockComponentProps } from "./blocks";
import AlignmentSelect from "../common/alignment-select";
import { ELinkType } from "../../../../../../types/global.types";
import { TPageDto } from "@/schemas/page.schema";
import { Editor } from "@/components/editor/blocks/editor-x/editor";

export default function TextBlock({
  sectionIdx,
  blockIdx,
}: BlockComponentProps) {
  const form = useFormContext<TPageDto>();

  const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;
  const ctaFieldName = `${blockName}.cta` as const;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: ctaFieldName,
  });

  return (
    <section className="space-y-6">
      <FormField
        control={form.control}
        name={`${blockName}.headline`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Headline</FormLabel>
            <FormControl>
              <Input className="py-5" maxLength={50} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${blockName}.subheadline`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub Headline</FormLabel>
            <FormControl>
              <Input className="py-5" maxLength={300} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${blockName}.body`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Editor
                placeholder="Write something..."
                editorSerializedState={field.value.json}
                onSerializedChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* CTA */}
      <FormField
        control={form.control}
        name={ctaFieldName}
        render={() => (
          <FormItem>
            <FormLabel>Links</FormLabel>
            <section className="space-y-2">
              {fields.map((f, idx) => {
                return (
                  <FormField
                    key={f.id}
                    control={form.control}
                    name={`${ctaFieldName}.${idx}`}
                    render={() => {
                      const isFieldError =
                        Array.isArray(form.formState.errors.sections) &&
                        !!form.formState.errors.sections[sectionIdx]?.blocks
                          ?.items?.[blockIdx]?.cta?.[idx];

                      return (
                        <FormItem>
                          <FormControl>
                            <CtaAccordion
                              idx={idx}
                              name={`${ctaFieldName}.${idx}`}
                              onRemove={() => remove(idx)}
                              isFieldError={isFieldError}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
            </section>

            {fields.length < 2 && (
              <FormControl>
                <section>
                  <Button
                    type="button"
                    variant={"outline"}
                    size={"sm"}
                    className="font-normal text-xs"
                    disabled={fields.length >= 2}
                    onClick={() => {
                      if (fields.length >= 2) return;

                      append({
                        type: ELinkType.Internal,
                        variant: ECtaVariant.Default,
                        text: "",
                        link: "",
                        arrow: false,
                        newTab: false,
                      });
                    }}
                  >
                    <Plus size={16} /> Add Link
                  </Button>
                </section>
              </FormControl>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <AlignmentSelect name={`${blockName}.align`} />
    </section>
  );
}
