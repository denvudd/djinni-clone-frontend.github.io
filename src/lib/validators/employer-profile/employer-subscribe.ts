import { z } from 'zod';
import { EmploymentOption, EnglishLevel } from '@/lib/enums';

export const EmployerSubscribeValidator = z.object({
  category: z.string({
    required_error: 'Це поле не може бути порожнім',
  }),
  experience: z.number({
    required_error: 'Це поле не може бути порожнім',
  }),
  english: z.nativeEnum(EnglishLevel).optional(),
  salaryForkGte: z
    .union([z.number(), z.null()])
    .optional()
    .transform((e) => (e === null ? undefined : e)),
  salaryForkLte: z
    .union([z.number(), z.null()])
    .optional()
    .transform((e) => (e === null ? undefined : e)),
  employmentOptions: z
    .nativeEnum(EmploymentOption, {
      invalid_type_error: 'Оберіть один пункт зі списку',
      required_error: 'Це поле не може бути порожнім',
    })
    .optional(),
  locate: z.union([z.string(), z.null()]).optional(),
  keywords: z.string().optional(),
});

export type EmployerSubscribeRequest = z.infer<typeof EmployerSubscribeValidator>;
