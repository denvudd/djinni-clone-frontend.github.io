import { z } from 'zod';

export const ExperienceRangeValidator = z.object({
  exp_from: z.number(),
  exp_to: z.number(),
});

export type ExperienceRangeRequest = z.infer<typeof ExperienceRangeValidator>;
