import { z } from 'zod';

export const gallerySchema = z.object({
  categoryId: z.string().min(1, { message: 'Category is required' }),
});

export type TGallerySchemaType = z.infer<typeof gallerySchema>;

export const galleryFormDefaultValues: TGallerySchemaType = {
  categoryId: '',
};