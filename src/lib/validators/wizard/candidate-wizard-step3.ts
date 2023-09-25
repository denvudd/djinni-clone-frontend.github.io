import { z } from 'zod';

export const CandidateWizardStep3Validator = z.object({
  experienceDescr: z
    .string()
    .nonempty("Це поле обов'язкове")
    .min(200, 'Мінімальна кількість символів - 200')
    .max(1500, 'Максимальна кількість символів - 1500'),
});

export type CandidateWizardStep3Request = z.infer<
  typeof CandidateWizardStep3Validator
>;
