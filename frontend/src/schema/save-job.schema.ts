import { z } from 'zod';
import { JobSchema } from './job.schema';

export const SavedJobSchema = z.object({
	jobId: z.number().int(),
});
export const SavedJobResponseSchema = SavedJobSchema.extend({
	id: z.number().int(),
	savedAt: z.date(),
	userId: z.number().int(),
	job: JobSchema,
});

export type SavedJobReq = z.infer<typeof SavedJobSchema>;
export type SavedJobRes = z.infer<typeof SavedJobResponseSchema>;
