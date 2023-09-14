import { z } from 'zod';

export const AddSkillValidator = z.object({
  name: z.string().nonempty(),
});

export type AddSkillRequest = z.infer<typeof AddSkillValidator>;
