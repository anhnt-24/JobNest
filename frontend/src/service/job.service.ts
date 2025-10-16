import { CreateJobReq, JobListQuery, JobRes, UpdateJobReq } from './../schema/job.schema';
import { api } from '@/lib/axios';
import { PaginationRes } from '@/schema/pagination.schema';
import { CompanyRes } from '@/schema/company.schema';

export const jobService = {
	create: (data: CreateJobReq) => api.post<JobRes>('/job/create', data),
	getById: (id: number) => api.get<JobRes>(`/job/${id}`),
	getByCompany: (companyId: number, query: any) => api.get<PaginationRes<JobRes>>(`/job/company/${companyId}`, { params: query }),
	update: (id: number, data: UpdateJobReq) => api.put<JobRes>(`/job/${id}`, data),
	getAll: (query: JobListQuery) => api.post<PaginationRes<JobRes>>('/job', query),
	me: (query: any) => api.post<PaginationRes<JobRes>>('/job/me', query),
	delete: (id: number) => api.delete<string>(`/job/${id}`),
	toggleSave: (jobId: number) => api.post<string>(`/job/save/${jobId}`),
	apply: (jobId: number, cvId: string, message?: string) => api.post<string>(`/job/apply/${jobId}`, { cvId, message }),
	updateStatus: (id: number, status: string) => api.put<string>(`/job/status/${id}`, { status: status }),
	getCompany: (id: number) => api.get<CompanyRes>(`/job/${id}/company`),
	getMyAppliedJobs: (query: any) => api.post<PaginationRes<JobRes>>('/job/my-applied', query),
	getAppliedJobs: (query: any) => api.post('/job/applied', query),
	getSavedJobs: (query: any) => api.post('/job/saved', query),
	isSaved: (jobId: number) => api.get<boolean>(`/job/is-saved/${jobId}`),
	getCVByJob: (jobId: number) => api.get<any[]>(`/job/cv/${jobId}`),
};
