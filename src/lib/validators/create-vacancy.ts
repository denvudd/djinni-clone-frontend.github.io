import { z } from 'zod';
import { ClarifiedDataEnum, CompanyType, EmploymentOption, EnglishLevel } from '../enums';

export const CreateVacancyValidator = z.object({
  active: z.boolean().optional(),
  name: z
    .string({
      required_error: 'Це поле не може бути порожнім',
    })
    .nonempty('Це поле не може бути порожнім'),
  domain: z
    .string({
      required_error: 'Це поле не може бути порожнім',
    })
    .nonempty('Оберіть один пункт зі списку'),

  description: z
    .string({
      required_error: 'Це поле не може бути порожнім',
    })
    .nonempty('Це поле не може бути порожнім')
    .min(300, 'Це поле має бути більше 300 символів')
    .max(14000, 'Це поле має бути менше 14000 символів'),

  youtube: z
    .union([
      z.string().nullable(),
      z
        .string()
        .regex(
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/,
          'Будь ласка, вкажіть правильне посилання',
        ),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  category: z
    .string({
      required_error: 'Це поле не може бути порожнім',
    })
    .nonempty('Оберіть один пункт зі списку'),

  country: z.string().optional(),
  city: z.union([z.string(), z.null()]).optional(),
  isRelocate: z.boolean(),

  salaryForkGte: z
    .union([z.number(), z.null()])
    .optional()
    .transform((e) => (e === null ? undefined : e)),
  salaryForkLte: z
    .union([z.number(), z.null()])
    .optional()
    .transform((e) => (e === null ? undefined : e)),

  privateSalaryForkGte: z.number(),
  privateSalaryForkLte: z.number(),

  experience: z.number({
    required_error: 'Це поле не може бути порожнім',
  }),

  english: z
    .nativeEnum(EnglishLevel, {
      invalid_type_error: 'Оберіть один пункт зі списку',
    })
    .optional(),
  employmentOptions: z.nativeEnum(EmploymentOption, {
    invalid_type_error: 'Оберіть один пункт зі списку',
    required_error: 'Це поле не може бути порожнім',
  }),
  companyType: z.nativeEnum(CompanyType, {
    invalid_type_error: 'Оберіть один пункт зі списку',
    required_error: 'Це поле не може бути порожнім',
  }),

  clarifiedData: z.array(z.nativeEnum(ClarifiedDataEnum)).optional(),
  skills: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

export type CreateVacancyRequest = z.infer<typeof CreateVacancyValidator>;
