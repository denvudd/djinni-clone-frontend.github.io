import { z } from 'zod';

export const EmployerAboutValidator = z.object({
  aboutCompany: z
    .string({ required_error: 'Це поле не може бути порожнім' })
    .nonempty('Це поле не може бути порожнім')
    .max(5000, 'Опис компанії не може бути більше 5000 символів'),
  companyLink: z.string().nonempty('Це поле не може бути порожнім').url('URL не є дійсним'),
  dou: z
    .string()
    .url('URL не є дійсним')
    .nullable()
    .transform((e) => e ?? undefined),
});

export type EmployerAboutRequest = z.infer<typeof EmployerAboutValidator>;
