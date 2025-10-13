import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react'; // icon loading
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm text-base  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground  hover:bg-primary/90',
				destructive: 'bg-destructive text-white  hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline: 'border border-primary text-primary bg-white  hover:bg-primary/5 dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary: 'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
				ghost: 'hover:brightness-95 dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
				sketch: ' border-input  border hover:bg-gray-100 underline-offset-4 text-gray-700 ',
				popover: 'text-muted-foreground border hover:text-white hover:bg-primary/90',
			},
			size: {
				default: 'h-10 px-4 py-1 has-[>svg]:px-4 ',
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2 text-sm [&_svg:not([class*='size-'])]:size-4 ",
				md: "h-8 gap-1.5 px-4 has-[>svg]:px-2 text-sm rounded-xs [&_svg:not([class*='size-'])]:size-5 ",
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	loading = false,
	children,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} disabled={loading || props.disabled} {...props}>
			{loading && <Loader2 className='animate-spin size-5 shrink-0' aria-hidden='true' />}
			{children}
		</Comp>
	);
}

export { Button, buttonVariants };
