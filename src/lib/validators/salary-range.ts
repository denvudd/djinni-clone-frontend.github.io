import { z } from 'zod';

export const SalaryRangeValidator = z.object({
  salary_min: z.number().optional(),
  salary_max: z.number().optional(),
});

export type SalaryRangeRequest = z.infer<typeof SalaryRangeValidator>;
