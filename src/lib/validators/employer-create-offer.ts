import { z } from 'zod';

export const EmployerCreateOfferValidator = z.object({
  coverLetter: z
    .string({
      required_error: 'Це поле не може бути порожнім',
    })
    .min(30, 'Це поле не може бути менше 30 символів')
    .max(3000, 'Це поле не може бути більше 3000 символів'),
});

export type EmployerCreateOfferRequest = z.infer<typeof EmployerCreateOfferValidator>;
