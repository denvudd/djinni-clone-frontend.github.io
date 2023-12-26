/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from 'zod';
import validator from 'validator';

export const CandidateAccountValidator = z.object({
  fullname: z.string().max(200, 'Максимальна допустима кількість символів - 200'),
  skype: z.string().max(200, 'Максимальна допустима кількість символів - 200'),
  phone: z
    .union([
      z.string().nullable(),
      z
        .string()
        .refine(
          (value) =>
            validator.isMobilePhone(value.replace(/[^0-9+]/g, ''), undefined, { strictMode: true }),
          {
            message: 'Некоректний номер телефону',
          },
        ),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  telegram: z.string().max(200, 'Максимальна допустима кількість символів - 200'),
  whatsApp: z.string().max(200, 'Максимальна допустима кількість символів - 200'),
  linkedIn: z
    .union([
      z.string().nullable(),
      z
        .string()
        .regex(
          /^(http(s)?:\/\/)?(www\.)?linkedin\.com\/in\/.{3,}$/,
          'Будь ласка, вкажіть правильне посилання на ваш профіль LinkedIn',
        ),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  github: z.string().url('Будь ласка, вкажіть правильне посилання на ваш профіль GitHub'),
  portfolio: z.string().url('Будь ласка, вкажіть правильне посилання на ваш резюме'),
});

export type CandidateAccountRequest = z.infer<typeof CandidateAccountValidator>;
