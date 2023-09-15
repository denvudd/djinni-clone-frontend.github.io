import { z } from 'zod';

export const SalaryRangeValidator = z.object({
  salary_min: z.number(),
  salary_max: z.number(),
});

export type SalaryRangeRequest = z.infer<typeof SalaryRangeValidator>;
