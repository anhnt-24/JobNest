import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export const useAuth = (): any => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};
