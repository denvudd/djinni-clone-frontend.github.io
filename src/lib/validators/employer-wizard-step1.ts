import { z } from 'zod';

export const EmployerWizardStep1Validator = z.object({
  fullname: z
    .string()
    .nonempty('Будь ласка, вкажіть імʼя та прізвище')
    .regex(
      /^[a-zA-Zа-яА-ЯІіЄєЇїҐґ]+ [a-zA-Zа-яА-ЯІіЄєЇїҐґ ,.'-]+$/u,
      'Будь ласка, вкажіть правильний формат імʼя та прізвище',
    )
    .min(3),
  positionAndCompany: z
    .string()
    .nonempty('Це поле не може бути порожнім')
    .min(10),
  linkedIn: z
    .string()
    .nonempty('Це поле не може бути порожнім')
    .regex(
      /^https:\/\/linkedin\.com\/in\/[^\/\s]+$/,
      'Будь ласка, вкажіть правильне посилання на ваш профіль LinkedIn',
    ),
  companyLink: z
    .string()
    .nonempty('Це поле не може бути порожнім')
    .url('URL не є дійсним'),
});

export type EmployerWizardStep1Request = z.infer<
  typeof EmployerWizardStep1Validator
>;
