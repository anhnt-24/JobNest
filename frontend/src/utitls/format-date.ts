export default function formatDate(input: string | Date): string {
	const date = input instanceof Date ? input : new Date(input);
	const now = new Date();
	const diff = (now.getTime() - date.getTime()) / 1000;

	if (diff < 60) {
		return `${Math.floor(diff)} giây trước`;
	}
	if (diff < 3600) {
		return `${Math.floor(diff / 60)} phút trước`;
	}
	if (diff < 86400) {
		return `${Math.floor(diff / 3600)} giờ trước`;
	}
	if (diff < 604800) {
		return `${Math.floor(diff / 86400)} ngày trước`;
	}
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}
