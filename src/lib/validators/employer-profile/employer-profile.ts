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
    .max(200, 'Максимальна допустима кількість символів - 200')
    .optional(),
  telegram: z
    .string()
    .max(200, 'Максимальна допустима кількість символів - 200')
    .optional(),
  phone: z
    .string()
    .refine(validator.isMobilePhone, {
      message: 'Некоректний номер телефону',
    })
    .optional(),
  linkedIn: z
    .string()
    .nonempty('Це поле не може бути порожнім')
    .regex(
      /^(http(s)?:\/\/)?(www\.)?linkedin\.com\/in\/.{3,}$/,
      'Будь ласка, вкажіть правильне посилання на ваш профіль LinkedIn',
    ),
});

export type EmployerProfileRequest = z.infer<typeof EmployerProfileValidator>;
