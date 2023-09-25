import { z } from 'zod';
import { EmploymentOption } from '../../enums';

export const CandidateWizardStep2Validator = z.object({
  employmentOptions: z.nativeEnum(EmploymentOption),
  city: z.string().nonempty(),
});

export type CandidateWizardStep2Request = z.infer<
  typeof CandidateWizardStep2Validator
>;
