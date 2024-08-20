export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconProps = {
	[k: string]: string | undefined;
	name: string;
	variant?: 'outline' | 'sharp';
};
