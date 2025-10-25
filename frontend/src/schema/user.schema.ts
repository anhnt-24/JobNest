import { z } from 'zod';

export const UserResponseSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	name: z.string().optional(),
	phone: z.string().optional(),
	avatarUrl: z.string().optional(),
	role: z.enum(['CANDIDATE', 'EMPLOYER', 'ADMIN', 'COMPANY']),
	active: z.boolean(),
	verified: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
	candidateId: z.number().optional(),
	companyId: z.number().optional(),
	employerId: z.number().optional(),
});

export type UserRes = z.infer<typeof UserResponseSchema>;
