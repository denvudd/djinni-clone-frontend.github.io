import { z } from 'zod';
import { RefusalReason } from '../enums';

export const RefuseOfferValidator = z.object({
  reason: z.nativeEnum(RefusalReason, {
    invalid_type_error: 'Оберіть один пункт зі списку',
    required_error: 'Це поле не може бути порожнім',
  }),
  message: z
    .string({ required_error: 'Введіть повідомлення' })
    .nonempty('Повідомлення не може бути порожнім')
    .min(30, 'Мінімальна довжина повідомлення - 30 символів')
    .max(5000, 'Максимальна довжина повідомлення - 5000 символів'),
  approve: z.literal(true, {
    errorMap: () => ({
      message: 'Будь ласка, підтвердіть, що ви не найняли цього кандидата',
    }),
  }),
});

export type RefuseOfferRequest = z.infer<typeof RefuseOfferValidator>;
