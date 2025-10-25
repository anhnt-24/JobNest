import { Badge } from '@/components/ui/badge';
import { Gem, Zap } from 'lucide-react';
import { cn } from '@/lib/utils'; // nếu có util merge class

type CustomBadgeProps = {
	type: 'top' | 'gap';
	size?: 'sm' | 'md' | 'lg';
};

const badgeConfig = {
	top: {
		label: 'TOP',
		icon: Gem,
		className: 'bg-gradient-to-br from-primary to-green-400',
	},
	gap: {
		label: 'GẤP',
		icon: Zap,
		className: 'bg-gradient-to-br from-red-600 to-orange-400',
	},
};

const sizeConfig = {
	sm: 'text-xs px-1.5 py-1 h-6',
	md: 'px-2 py-0.5 h-6',
	lg: 'px-1 py-0.5 text-xs rounded-full',
};

export function CustomBadge({ type, size = 'lg' }: CustomBadgeProps) {
	const config = badgeConfig[type];
	const Icon = config.icon;

	return (
		<Badge className={cn(config.className, sizeConfig[size])}>
			<Icon className='!size-3' /> {config.label}
		</Badge>
	);
}
