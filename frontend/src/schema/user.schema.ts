import z from 'zod';
import { candidateResponseSchema } from './candidate.schema';
import { companyResponseSchema } from './company.schema';

export const UserResponseSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	role: z.enum(['CANDIDATE', 'EMPLOYER', 'ADMIN', 'COMPANY']),
	candidate: candidateResponseSchema.optional(),
	company: companyResponseSchema.optional(),
});

export type UserRes = z.infer<typeof UserResponseSchema>;
