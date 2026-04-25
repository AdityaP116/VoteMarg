import { z } from 'zod';

export const UserAnswersSchema = z.object({
  age: z.number().int().min(0).max(150),
  citizenship: z.enum(['yes', 'no']),
  registered: z.enum(['yes', 'no', 'not_sure']),
  moved: z.enum(['yes', 'no'])
});

export const CheckRequestSchema = UserAnswersSchema.extend({
  state: z.string().optional(),
  language: z.string().optional(),
  userId: z.string().optional()
});

export type ValidatedUserAnswers = z.infer<typeof UserAnswersSchema>;
export type ValidatedCheckRequest = z.infer<typeof CheckRequestSchema>;
