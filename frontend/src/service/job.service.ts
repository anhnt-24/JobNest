import { get } from 'lodash';
import { CompanyResponse } from './../schema/company.schema';
import { JobSchema } from './../schema/job.schema';
import { api } from '@/lib/axios';
import { JobResponse } from '@/schema/job.schema';

export const jobService = {
	create: (data: any) => api.post<JobResponse>('/job/create', data),
	getById: (id: number) => api.get<JobResponse>(`/job/${id}`),
	getByCompany: (companyId: number, query: any) => api.get<JobResponse[]>(`/job/companies/${companyId}`, { params: query }),

	update: (id: number, data: any) => api.put<JobResponse>(`/job/${id}`, data),
	getAll: (query: any) => api.post<JobResponse[]>('/job', query),
	getListByMe: (query: any) => api.post<JobResponse[]>('/job/me', query),
	delete: (id: number) => api.delete<string>(`/job/${id}`),
	toggleSave: (jobId: number) => api.post<string>(`/job/${jobId}/toggle-save`),
	apply: (jobId: number, cvId: string, message?: string) => api.post<string>(`/job/${jobId}/apply`, { cvId, message }),
	updateStatus: (id: number, status: string) => api.put<string>(`/job/${id}/status`, { status: status }),
	getCompany: (id: number) => api.get<CompanyResponse>(`/job/${id}/company`),
	getMyAppliedJobs: (query: any) => api.post('/job/my-applied', query),
	getAppliedJobs: (query: any) => api.post('/job/applied', query),
	getSavedJobs: (query: any) => api.post('/job/saved', query),
	isJobSaved: (jobId: number) => api.get<boolean>(`/job/${jobId}/is-saved`),
	getCVsByJob: (jobId: number) => api.get<any[]>(`/job/${jobId}/cvs`),
};
