import { z } from "zod";
import { EBlock, ECardsBlockLayout } from "../../types/blocks.types";
import {
  EAlignment,
  ELinkType,
  EOrder,
  ERefRelation,
} from "../../types/global.types";
import { CTADtoSchema, HeroSectionDtoSchema } from "./hero-section.schema";
import { mediaSchema } from "./media.schema";
import { richTextSchema } from "./rich-text.schema";

// ---- BaseBlock ----
export const BaseBlockSchema = z.object({
  type: z.nativeEnum(EBlock),
});

// ---- TextBlockDto ----
export const TextBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Text),
  headline: z
    .string()
    .trim()
    .max(100, { message: "Headline must be less than 100 characters" }),
  subheadline: z
    .string()
    .trim()
    .max(300, { message: "Subheadline must be less than 300 characters" }),
  body: richTextSchema,
  cta: z.array(CTADtoSchema).max(2, { message: "CTA must be less than 2" }),
  align: z.nativeEnum(EAlignment),
});

export type TextBlockDto = z.infer<typeof TextBlockSchema>;

// ---- ImageBlockDto ----
export const ImageBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Image),
  images: z
    .array(mediaSchema)
    .min(1, { message: "At least one image is required" }),
});

export type ImageBlockDto = z.infer<typeof ImageBlockSchema>;

// ---- CardDto ----
export const CardSchema = z.object({
  title: z
    .string()
    .trim()
    .max(100, { message: "Title must be between 3 and 100 characters" })
    .optional(),
  subtitle: z
    .string()
    .trim()
    .max(300, { message: "Max 300 characters" })
    .optional(),
  description: richTextSchema,
  link: z
    .object({
      url: z.string(),
      type: z.nativeEnum(ELinkType),
    })
    .optional()
    .refine((data) => {
      if (!data) return true;
      if (
        data.type === ELinkType.External &&
        !z.string().url().safeParse(data.url).success
      )
        return false;
      return true;
    }, "Invalid URL"),
  image: mediaSchema.nullish(),
  borderLess: z.boolean(),
  newTab: z.boolean(),
});

export const MAX_CARD_BLOCK_CARDS = 4;

const maxColsSchema = z.coerce
  .number()
  .int()
  .min(1, { message: "At least 1 column is required" })
  .max(MAX_CARD_BLOCK_CARDS, {
    message: `Max ${MAX_CARD_BLOCK_CARDS} columns allowed`,
  });

// ---- CardsBlockDto ----
export const CardsBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Cards),
  layout: z.nativeEnum(ECardsBlockLayout),
  columns: z.object({
    sm: maxColsSchema.optional(),
    md: maxColsSchema.optional(),
    lg: maxColsSchema.optional(),
    xl: maxColsSchema.optional(),
  }),
  cards: z
    .array(CardSchema)
    .min(1, { message: "At least one card is required" }),
});
export type CardsBlockDto = z.infer<typeof CardsBlockSchema>;
// ---- RefItemBlockDto ----
export const RefItemBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.RefItem),
  refRelation: z.nativeEnum(ERefRelation),
  limit: z.coerce.number().int().min(1),
  cols: z.coerce.number().int().min(1),
  order: z.nativeEnum(EOrder),
  selected: z
    .array(
      z.object({
        // manually choosen items by the user
        value: z.string().min(1, { message: "Value is required" }),
        label: z.string().min(1, { message: "Label is required" }),
      })
    )
    .optional(),
});

export type RefItemBlockDto = z.infer<typeof RefItemBlockSchema>;

// ---- FormBlockDto ----
export const FormBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Form),
  form: z.object({
    id: z
      .string({ required_error: "Form id is required" })
      .uuid({ message: "Please select a form" }),
    title: z.string().min(1, { message: "Title is required" }),
  }),
  introContent: richTextSchema.optional(),
});

export type FormBlockDto = z.infer<typeof FormBlockSchema>;
// --- FaqBlockDto ---
export const FaqBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Faq),
});

// --- AlumniBlockDto ---
export const AlumniBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Alumni),
});

// --- TestimonialBlockDto ---
export const TestimonialBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Testimonial),
});

// --- PartnerBlockDto ---
export const PartnerBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Partner),
});

// --- CertificationBlockDto ---
export const CertificationBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Certification),
});

// --- ContactBlockDto ---
export const ContactBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.ContactText),
});

//map
export const MapBlockSchema = BaseBlockSchema.extend({
  type: z.literal(EBlock.Map),
});

// ---- Discriminated union of all blocks ----
export const BlockSchema = z.discriminatedUnion("type", [
  TextBlockSchema,
  ImageBlockSchema,
  CardsBlockSchema,
  RefItemBlockSchema,
  FormBlockSchema,
  FaqBlockSchema,
  AlumniBlockSchema,
  TestimonialBlockSchema,
  PartnerBlockSchema,
  CertificationBlockSchema,
  ContactBlockSchema,
  MapBlockSchema
]);

export type TBlock = z.infer<typeof BlockSchema>;

// ---- PageBlocksDto ----
export const PageBlocksSchema = z.object({
  direction: z.enum(["horizontal", "vertical"]),
  items: z.array(BlockSchema),
});

// ---- PageSectionDto ----
export const PageSectionSchema = z
  .object({
    tagline: z
      .string()
      .max(50, { message: "Tagline must be between 3 and 50 characters" })
      .optional(),
    title: z
      .string()
      .max(50, { message: "Title must be between 3 and 50 characters" })
      .optional(),
    headline: z
      .string()
      .trim()
      .max(50, { message: "Headline must be between 3 and 50 characters" }),
    subheadline: z
      .string()
      .trim()
      .max(300, {
        message: "Subheadline must be between 10 and 300 characters",
      })
      .optional(),
    headlineAlignment: z.nativeEnum(EAlignment),
    blocks: PageBlocksSchema.optional(),
    container: z.boolean().optional(),
  })
  .strict();

export type TPageSection = z.infer<typeof PageSectionSchema>;

export const MetadataDtoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be between 3 and 50 characters" })
    .max(100, { message: "Title must be between 3 and 100 characters" }),
  description: z
    .string()
    .trim()
    .max(300, { message: "Description must be between 3 and 300 characters" }),
  keywords: z
    .array(z.string().max(50, "Keyword must be at most 50 characters").trim())
    .max(10, "You can add up to 10 keywords only"),
  ogImage: mediaSchema.nullish(),
});

export type TMetadataDto = z.infer<typeof MetadataDtoSchema>;

// ---- PageDtoSchema ----
export const PageDtoSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  sections: z
    .array(PageSectionSchema)
    .max(20, { message: "Max 20 sections allowed" }),
  metadata: MetadataDtoSchema,
  heroSections: z
    .array(HeroSectionDtoSchema)
    .max(5, { message: "Hero Sections must be less than 5" }),
});

export type TPageDto = z.infer<typeof PageDtoSchema>;
