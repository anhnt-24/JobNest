import { Avatar } from '@/components/ui/avatar';
import { api } from '@/lib/axios';
import { CandidateProfileResponse } from '@/schema/candidate.schema';
export const candidateService = {
	getProfile: () => api.get<CandidateProfileResponse>('/candidates/me'),
	updateProfile: (data: any) => api.put<CandidateProfileResponse>('/candidates/me', data),
	uploadAvatar: (file: File) => {
		const formData = new FormData();
		formData.append('avatar', file);
		return api.patch<string>('/candidates/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
