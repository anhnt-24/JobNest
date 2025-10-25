import { api } from '@/lib/axios';
import { ApplicationRes, ApplicationReq } from '@/schema/application.schema';
import { PaginationRes } from '@/schema/pagination.schema';

export const applicationService = {
	getMyAppliedJobs: (query: any) => api.post<PaginationRes<ApplicationRes>>('/applications/me', query),
	getAppliedJobs: (query: any) => api.post<PaginationRes<ApplicationRes>>('/applications/applied', query),
	applyForJob: (jobId: number, cvId: number, message?: string) => api.post<ApplicationRes>(`/applications/jobs/${jobId}`, { cvId, message }),
	getById: (id: number) => api.get<ApplicationRes>(`/applications/${id}`),
	update: (id: number, req: ApplicationReq) => api.patch<ApplicationRes>(`/applications/${id}`, req),
	remove: (id: number) => api.delete(`/applications/${id}`),
};
