import { z } from 'zod';

export const MarketStatisticsValidator = z.object({
  title: z.string().optional(),
  exp: z.number().optional(),
});

export type MarketStatisticsRequest = z.infer<typeof MarketStatisticsValidator>;
