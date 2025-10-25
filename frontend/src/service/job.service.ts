import { JobListQuery, JobRes, JobReq } from './../schema/job.schema';
import { api } from '@/lib/axios';
import { PaginationRes } from '@/schema/pagination.schema';
import { CompanyRes } from '@/schema/company.schema';

export const jobService = {
	create: (data: JobReq) => api.post<JobRes>('/jobs', data),
	getById: (id: number) => api.get<JobRes>(`/jobs/${id}`),
	getByCompany: (companyId: number, query: any) => api.get<PaginationRes<JobRes>>(`/jobs/companies/${companyId}`, { params: query }),
	update: (id: number, data: JobReq) => api.put<JobRes>(`/jobs/${id}`, data),
	getAll: (query: JobListQuery) => api.post<PaginationRes<JobRes>>('/jobs/list', query),
	me: (query: any) => api.post<PaginationRes<JobRes>>('/jobs/me', query),
	delete: (id: number) => api.delete<string>(`/jobs/${id}`),
	toggleSave: (jobId: number) => api.post<string>(`/jobs/${jobId}/save`),
	updateStatus: (id: number, status: string) => api.put<string>(`/jobs/${id}/status`, { status: status }),
	getCompany: (id: number) => api.get<CompanyRes>(`/jobs/${id}/company`),
	getSavedJobs: (query: any) => api.post('/jobs/saved', query),
	isSaved: (jobId: number) => api.get<boolean>(`/jobs/${jobId}/is-saved`),
	getCVByJob: (jobId: number) => api.get<any[]>(`/jobs/cv/${jobId}`),
};
