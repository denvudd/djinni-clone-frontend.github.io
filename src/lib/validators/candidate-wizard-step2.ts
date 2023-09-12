import { z } from 'zod';
import { EmploymentOption, EnglishLevel } from '../enums';

const skillSchema = {
  name: z.string().nonempty(),
  category: z.string().optional(),
};

export const CandidateWizardStep2Validator = z.object({
  employmentOptions: z.nativeEnum(EmploymentOption),
  city: z.string().nonempty(),
  skills: z.object(skillSchema).array().nonempty().optional(),
});

export type CandidateWizardStep2Request = z.infer<
  typeof CandidateWizardStep2Validator
>;
