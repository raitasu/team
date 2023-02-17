import { z } from 'zod';

export const PositionSchema = z.object({
  id: z.number(),
  name: z.string()
});
