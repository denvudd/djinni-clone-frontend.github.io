import { z } from 'zod';
import { EnglishLevel } from '../../enums';

export const CandidateWizardStep1Validator = z.object({
  category: z.string().nonempty('Будь ласка, виберіть категорію'),
  experience: z.number(),
  expectations: z.number(),
  position: z.string(),
  english: z.nativeEnum(EnglishLevel),
});

export type CandidateWizardStep1Request = z.infer<
  typeof CandidateWizardStep1Validator
>;
