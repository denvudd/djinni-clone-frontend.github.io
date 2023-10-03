import { z } from 'zod';

export const RegisterValidator = z.object({
  email: z.string().email('Не вірний формат електронної пошти'),
  password: z
    .string()
    .min(6, 'Пароль повинен бути довжиною не менше 6 символів')
    .regex(/^(?=.*\d)(?=.*[A-Z]).+$/, 'Повинна бути мінімум одна заглавна літера та цифра'),
  role: z.enum(['Candidate', 'Employer'], {
    required_error: 'Вам потрібно обрати Вашу роль.',
  }),
});

export type RegisterRequest = z.infer<typeof RegisterValidator>;
