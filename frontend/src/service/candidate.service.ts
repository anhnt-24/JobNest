import { api } from '@/lib/axios';
import { CandidateRes, CandidateReq } from '@/schema/candidate.schema';

export const candidateService = {
	me: () => api.get<CandidateRes>('/candidates/me'),
	getById: (id: number) => api.get<CandidateRes>(`/candidates/${id}`),
	update: (req: CandidateReq) => api.put<CandidateRes>('/candidates/me', req),
};
