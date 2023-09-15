import { z } from 'zod';
import {
  ClarifiedData,
  CompanyType,
  EmploymentOption,
  EnglishLevel,
} from '../enums';

export const CreateVacancyValidator = z.object({
  employerId: z.string().nonempty(),
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
    .string()
    .nonempty('Це поле не може бути порожнім')
    .regex(
      /^https:\/\/youtube\.com\/in\/[^\/\s]+$/,
      'Будь ласка, вкажіть правильне посилання',
    )
    .optional(),
  category: z
    .string({
      required_error: 'Це поле не може бути порожнім',
    })
    .nonempty('Оберіть один пункт зі списку'),

  country: z.string().optional(),
  city: z.string().optional(),
  isRelocate: z.boolean(),

  salaryForkGte: z.number().optional(),
  salaryForkLte: z.number().optional(),
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

  clarifiedData: z.array(z.nativeEnum(ClarifiedData)).optional(),
  skills: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

export type CreateVacancyRequest = z.infer<typeof CreateVacancyValidator>;
