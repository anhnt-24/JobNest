import { api } from '@/lib/axios';
import { CandidateProfileRes, UpdateCandidateReq } from '@/schema/candidate.schema';
export const candidateService = {
	getProfile: () => api.get<CandidateProfileRes>('/candidate/me'),
	updateProfile: (req: UpdateCandidateReq) => api.put<CandidateProfileRes>('/candidate/me', req),
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
