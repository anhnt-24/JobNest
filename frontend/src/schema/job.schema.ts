import { z } from 'zod';

export const Levels = ['INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEADER'] as const;
export type Level = (typeof Levels)[number];
export const LevelSchema = z.enum(Levels);

export const Educations = ['NONE', 'ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTOR'] as const;
export type Education = (typeof Educations)[number];
export const EducationSchema = z.enum(Educations);

export const JobTypes = ['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT'] as const;
export type Type = (typeof JobTypes)[number];
export const JobTypeSchema = z.enum(JobTypes);

export const JobSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1),
	requirements: z.string().min(1),
	benefits: z.string(),
	workingAddress: z.string().min(1),
	workingTime: z.string().min(1),
	applicationMethod: z.string(),
	salary: z.string(),
	quantity: z.number().int().positive(),
	deadline: z.date(),
	experience: z.string(),
	level: LevelSchema,
	education: EducationSchema,
	type: JobTypeSchema,

	categories: z.string(),
	mustSkills: z.string(),
	niceSkills: z.string().optional(),
	areaTags: z.string(),
});
export const JobResponseSchema = JobSchema.extend({
	id: z.number().int(),
	thumbnailUrl: z.string(),
	status: z.string(),
	companyId: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CreateJobDto = z.infer<typeof JobSchema>;
export type UpdateJobDto = z.infer<typeof JobSchema>;
export type JobResponse = z.infer<typeof JobResponseSchema>;
