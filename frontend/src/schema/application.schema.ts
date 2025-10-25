import { z } from 'zod';
import { JobResponseSchema } from './job.schema';
import { CVResponseSchema } from './cv.schema';

export const ApplicationSchema = z.object({
	candidateId: z.number().int(),
	jobId: z.number().int(),
	cvId: z.number().int(),
	message: z.string().optional(),
	appliedAt: z.date().optional(),
	status: z.enum(['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED']).optional().default('PENDING'),
});

export const applicationResponseSchema = ApplicationSchema.extend({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
	job: JobResponseSchema,
	cv: CVResponseSchema,
});

export type ApplicationReq = z.infer<typeof ApplicationSchema>;
export type ApplicationRes = z.infer<typeof applicationResponseSchema>;
