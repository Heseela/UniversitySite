import { z } from "zod";
import { mediaSchema } from "./media.schema";
import { richTextDefaultValues, richTextSchema } from "./rich-text.schema";

export const credibilityAndSupportSchema = z.object({
  faqCategories: z.array(
    z.object({
      name: z.string().min(1, { message: "Category is required" }),
    })
  ),
  faqs: z.array(
    z.object({
      question: z.string().min(1, { message: "Question is required" }),
      answer: richTextSchema,
      category: z.string().min(1, { message: "Category is required" }),
    })
  ),
  partners: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      image: mediaSchema.nullish(),
      
      link: z
        .string()
        .optional()
        .refine((val) => {
          if (val?.length === 0) return true;
          return z.string().url().safeParse(val).success;
        }),
      age: z.string().min(1, { message: "Age is required" }),
    })
  ),
  testimonials: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      image: mediaSchema.nullish(),
      link: z
        .string()
        .optional()
        .refine((val) => {
          if (val?.length === 0) return true;
          return z.string().url().safeParse(val).success;
        }),
      quote: z.string().min(1, { message: "Quote is required" }),
      role: z.string().optional(),
      rating: z.coerce
        .number()
        .min(1, { message: "Min rating is 1" })
        .max(5, { message: "Max rating is 5" }),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      image: mediaSchema.nullish(),
      link: z
        .string()
        .optional()
        .refine((val) => {
          if (val?.length === 0) return true;
          return z.string().url().safeParse(val).success;
        }),
    })
  ),
  alumni: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      image: mediaSchema.nullish(),
      link: z
        .string()
        .optional()
        .refine((val) => {
          if (val?.length === 0) return true;
          return z.string().url().safeParse(val).success;
        }),
      story: richTextSchema,
    })
  ),
});

export type TCredibilityAndSupport = z.infer<
  typeof credibilityAndSupportSchema
>;

export const credibilityAndSupportDefaultValue: TCredibilityAndSupport = {
  faqCategories: [{ name: "General" }],
  faqs: [],
  partners: [],
  testimonials: [],
  certifications: [],
  alumni: [],
};

export const faqDefaultValue: TCredibilityAndSupport["faqs"][0] = {
  question: "",
  answer: richTextDefaultValues,
  category: "",
};

export const partnerDefaultvalue: TCredibilityAndSupport["partners"][0] = {
  name: "",
  image: null,
  link: "",
  age: "",
};

export const testimonialDefaultvalue: TCredibilityAndSupport["testimonials"][0] =
  {
    name: "",
    image: null,
    link: "",
    role: "",
    quote: "",
    rating: 5,
  };

export const certificationDefaultvalue: TCredibilityAndSupport["certifications"][0] =
  {
    name: "",
    image: null,
    link: "",
  };

export const alumniDefaultvalue: TCredibilityAndSupport["alumni"][0] = {
  name: "",
  image: null,
  link: "",
  story: richTextDefaultValues,
};
