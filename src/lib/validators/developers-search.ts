import { z } from 'zod';

export const DevelopersSearchValidator = z.object({
  keywords: z.string(),
});

export type DevelopersSearchRequest = z.infer<typeof DevelopersSearchValidator>;
