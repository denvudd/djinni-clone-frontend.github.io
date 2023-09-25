import { z } from 'zod';

export const LoginValidator = z.object({
  username: z.string().email('Не вірний формат електронної пошти'),
  password: z
    .string()
    .min(6)
    .regex(
      /^(?=.*\d)(?=.*[A-Z]).+$/,
      'Повинна бути мінімум одна заглавна літера та цифра',
    ),
});

export type LoginRequest = z.infer<typeof LoginValidator>;
