import { z } from 'zod';
import { companyResponseSchema } from './company.schema';
export const JobLevels = ['INTERN', 'FRESHER', 'JUNIOR', 'MID', 'SENIOR', 'MANAGER', 'DIRECTOR'] as const;
export const JobLevelSchema = z.enum(JobLevels);

export const JobTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP'] as const;

export const EducationLevels = ['NONE', 'HIGH_SCHOOL', 'COLLEGE', 'BACHELOR', 'MASTER', 'DOCTORATE'] as const;

export const ExperienceLevels = ['NONE', 'SIX_MONTH', 'ONE_TWO_YEARS', 'TWO_THREE_YEARS', 'THREE_FIVE_YEARS', 'FIVE_PLUS'] as const;

export const JobTypeSchema = z.enum(JobTypes);
export const EducationLevelSchema = z.enum(EducationLevels);
export const ExperienceLevelSchema = z.enum(ExperienceLevels);

export const JobStatuses = ['OPEN', 'CLOSED', 'PAUSED', 'PENDING'] as const;
export const JobStatusSchema = z.enum(JobStatuses);

export const JobSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	requirements: z.string().optional(),
	benefits: z.string().optional(),
	workingAddress: z.string().optional(),
	workingTime: z.string().optional(),
	applicationMethod: z.string().optional(),
	salary: z.string().optional(),
	experience: ExperienceLevelSchema.default('NONE'),
	quantity: z.number().int().positive().optional(),
	level: JobLevelSchema,
	education: EducationLevelSchema.optional(),
	type: JobTypeSchema,
	category: z.string().optional(),
	mustSkills: z.array(z.string()).default([]),
	niceSkills: z.array(z.string()).default([]),
	areaTags: z.array(z.string()).default([]),
	deadline: z.coerce.date().optional(),
	status: JobStatusSchema.default('PENDING'),
	companyId: z.number().int(),
	employerId: z.number().int().optional(),
});

export const UpdateJobSchema = JobSchema.partial();

export const JobResponseSchema = JobSchema.extend({
	id: z.number().int(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	company: companyResponseSchema,
});

export const JobFilterSchema = z.object({
	title: z.string().optional(),
	level: JobLevelSchema.optional(),
	type: JobTypeSchema.optional(),
	education: EducationLevelSchema.optional(),
	experience: ExperienceLevelSchema.optional(),
	status: JobStatusSchema.optional(),

	salaryFrom: z.coerce.number().int().min(0).optional(),
	salaryTo: z.coerce.number().int().min(0).optional(),

	deadlineBefore: z.coerce.date().optional(),
	companyId: z.coerce.number().int().optional(),
	employerId: z.coerce.number().int().optional(),

	workingAddress: z.string().optional(),
	category: z.string().optional(),
});

export const JobOrderFields = ['createdAt', 'salary', 'deadline'] as const;
export const SortOrders = ['asc', 'desc'] as const;

export const JobListQuerySchema = JobFilterSchema.extend({
	page: z.coerce.number().int().min(1).default(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
	orders: z
		.object({
			createdAt: z.enum(['asc', 'desc']).optional(),
			salary: z.enum(['asc', 'desc']).optional(),
			deadline: z.enum(['asc', 'desc']).optional(),
		})
		.optional(),
});

export type CreateJobReq = z.infer<typeof JobSchema>;
export type UpdateJobReq = z.infer<typeof UpdateJobSchema>;

export type JobRes = z.infer<typeof JobResponseSchema>;
export type JobFilter = z.infer<typeof JobFilterSchema>;
export type JobListQuery = z.infer<typeof JobListQuerySchema>;
