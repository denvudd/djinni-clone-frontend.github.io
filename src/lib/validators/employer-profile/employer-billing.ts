/* eslint-disable quotes */
import { z } from 'zod';
import validator from 'validator';

export const EmployerBillingValidator = z.object({
  firstName: z
    .string({
      required_error: "Це поле обов'язкове до заповнення",
    })
    .nonempty("Це поле обов'язкове до заповнення"),
  lastName: z
    .string({
      required_error: "Це поле обов'язкове до заповнення",
    })
    .nonempty("Це поле обов'язкове до заповнення"),
  email: z
    .string({
      required_error: "Це поле обов'язкове до заповнення",
    })
    .email('Не вірний формат електронної пошти'),
  phone: z
    .string()
    .refine(
      (value) =>
        validator.isMobilePhone(value.replace(/[^0-9+]/g, ''), undefined, { strictMode: true }),
      {
        message: 'Некоректний номер телефону',
      },
    ),
  country: z
    .string({
      required_error: "Це поле обов'язкове до заповнення",
    })
    .nonempty("Це поле обов'язкове до заповнення"),
  company: z
    .union([z.string().nullable(), z.string()])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  firstStreet: z
    .string({
      required_error: "Це поле обов'язкове до заповнення",
    })
    .nonempty("Це поле обов'язкове до заповнення"),
  secondStreet: z
    .union([z.string().nullable(), z.string()])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
  city: z
    .string({
      required_error: "Це поле обов'язкове до заповнення",
    })
    .nonempty("Це поле обов'язкове до заповнення"),
  postalCode: z.number({
    required_error: "Це поле обов'язкове до заповнення",
  }),
  vatId: z
    .union([z.string().nullable(), z.string()])
    .optional()
    .transform((e) => (e === '' || e === null ? undefined : e)),
});

export type EmployerBillingRequest = z.infer<typeof EmployerBillingValidator>;
