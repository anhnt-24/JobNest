import { api } from '@/lib/axios';
import { CandidateRes, UpdateCandidateReq } from '@/schema/candidate.schema';
export const candidateService = {
	me: () => api.get<CandidateRes>('/candidate/me'),
	update: (req: UpdateCandidateReq) => api.put<CandidateRes>('/candidate/me', req),
	uploadAvatar: (file: File) => {
		const formData = new FormData();
		formData.append('avatar', file);
		return api.patch<string>('/candidate/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
