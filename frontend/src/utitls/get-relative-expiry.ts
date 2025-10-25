// src/utils/time-remaining.ts

export function getRelativeExpiry(expiry: string | Date): string {
	const target = expiry instanceof Date ? expiry.getTime() : new Date(expiry).getTime();
	const now = Date.now();
	const diff = target - now;

	if (diff <= 0) return 'Đã hết hạn';

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);

	if (years >= 1) {
		const remainingMonths = months % 12;
		return `Còn ${years} năm${remainingMonths ? ` ${remainingMonths} tháng` : ''}`;
	}
	if (months >= 1) {
		const remainingDays = days % 30;
		return `Còn ${months} tháng${remainingDays ? ` ${remainingDays} ngày` : ''}`;
	}
	if (days >= 1) {
		const remainingHours = hours % 24;
		return `Còn ${days} ngày${remainingHours ? ` ${remainingHours} giờ` : ''}`;
	}
	if (hours >= 1) {
		const remainingMinutes = minutes % 60;
		return `Còn ${hours} giờ${remainingMinutes ? ` ${remainingMinutes} phút` : ''}`;
	}
	if (minutes >= 1) {
		return `Còn ${minutes} phút`;
	}
	return `Còn ${seconds} giây`;
}
