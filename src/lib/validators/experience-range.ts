import { z } from 'zod';

export const ExperienceRangeValidator = z.object({
  exp_from: z.number().optional(),
  exp_to: z.number().optional(),
});

export type ExperienceRangeRequest = z.infer<typeof ExperienceRangeValidator>;
