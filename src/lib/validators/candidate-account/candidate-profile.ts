/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from 'zod';
import { CommunicateMethod, EmploymentOption, EnglishLevel, PreferableLanguage } from '@/lib/enums';

export const CandidateProfileValidator = z.object({
  position: z.string().max(200, 'Максимальна допустима кількість символів - 200'),
  category: z.string().max(200, 'Максимальна допустима кількість символів - 200'),
  experience: z.number({
    required_error: 'Це поле не може бути порожнім',
  }),
  expectations: z.number({
    required_error: 'Це поле не може бути порожнім',
  }),
  city: z.union([z.string(), z.null()]).optional(),
  isRelocate: z.boolean().optional(),
  english: z
    .nativeEnum(EnglishLevel, {
      invalid_type_error: 'Оберіть один пункт зі списку',
    })
    .optional(),
  experienceDescr: z
    .union([
      z.string().nullable(),
      z
        .string()
        .min(10, 'Максимальна допустима кількість символів - 10')
        .max(1500, 'Максимальна допустима кількість символів - 1500'),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  achievementsDescr: z
    .union([
      z.string().nullable(),
      z
        .string()
        .min(10, 'Максимальна допустима кількість символів - 10')
        .max(1500, 'Максимальна допустима кількість символів - 1500'),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  expectationsDescr: z
    .union([
      z.string().nullable(),
      z
        .string()
        .min(10, 'Максимальна допустима кількість символів - 10')
        .max(1500, 'Максимальна допустима кількість символів - 1500'),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  employmentOptions: z.nativeEnum(EmploymentOption, {
    invalid_type_error: 'Оберіть один пункт зі списку',
    required_error: 'Це поле не може бути порожнім',
  }),
  hourlyRate: z
    .union([z.number(), z.number().nullable()])
    .optional()
    .transform((e) => (e === null ? undefined : e)),
  blockedDomains: z.array(z.string()).optional(),
  blockedTypes: z.array(z.string()).optional(),
  employerQuestions: z
    .union([
      z.string().nullable(),
      z
        .string()
        .min(10, 'Максимальна допустима кількість символів - 10')
        .max(800, 'Максимальна допустима кількість символів - 800'),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  preferableLang: z.nativeEnum(PreferableLanguage, {
    invalid_type_error: 'Оберіть один пункт зі списку',
    required_error: 'Це поле не може бути порожнім',
  }),
  communicateMethod: z.nativeEnum(CommunicateMethod, {
    invalid_type_error: 'Оберіть один пункт зі списку',
    required_error: 'Це поле не може бути порожнім',
  }),
});

export type CandidateProfileRequest = z.infer<typeof CandidateProfileValidator>;
