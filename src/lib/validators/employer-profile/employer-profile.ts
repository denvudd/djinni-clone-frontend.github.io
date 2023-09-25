import { z } from 'zod';
import validator from 'validator';

export const EmployerProfileValidator = z.object({
  fullname: z
    .string({
      required_error: "Це поле обов'язкове до заповнення",
    })
    .nonempty("Це поле обов'язкове до заповнення")
    .min(5, 'Повне ім’я не може бути менше 5 символів.')
    .max(120, 'Повне ім’я не може бути більше 120 символів.'),
  positionAndCompany: z
    .string()
    .max(200, 'Максимальна допустима кількість символів - 200'),
  telegram: z
    .union([
      z.string().max(200, 'Максимальна допустима кількість символів - 200'),
      z.null(),
    ])
    .optional()
    .transform((e) => (e === null ? undefined : e)),
  phone: z
    .union([
      z.string().nullable(),
      z.string().refine((value) => validator.isMobilePhone(value), {
        message: 'Некоректний номер телефону',
      }),
    ])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
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
});

export type EmployerProfileRequest = z.infer<typeof EmployerProfileValidator>;
