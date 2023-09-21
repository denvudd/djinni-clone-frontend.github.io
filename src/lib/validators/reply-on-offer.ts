import { z } from 'zod';

export const ReplyOnOfferValidator = z.object({
  text: z
    .string()
    .min(30, 'Повідомлення повинно бути не менше 30 символів')
    .max(5000, 'Повідомлення повинно бути не більше 5000 символів'),
});

export type ReplyOnOfferRequest = z.infer<typeof ReplyOnOfferValidator>;
