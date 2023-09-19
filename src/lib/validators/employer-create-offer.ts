import { z } from 'zod';

export const EmployerCreateOfferValidator = z.object({
  coverLetter: z.string().min(30).max(3000),
});

export type EmployerCreateOfferRequest = z.infer<
  typeof EmployerCreateOfferValidator
>;
