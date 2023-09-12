import { z } from 'zod';

export const AddSkillValidator = z.object({
  name: z.string().nonempty(),
  category: z.string().optional(),
});

export type AddSkillRequest = z.infer<typeof AddSkillValidator>;
