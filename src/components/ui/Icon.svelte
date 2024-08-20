<script lang="ts">
	import type { IconProps } from '$lib/client/types';

	interface $$Props extends IconProps {}

	export let name: string;
	export let variant: 'outline' | 'sharp' | undefined = undefined;

	$: iconName = `${name}${variant ? `-${variant}` : ''}`;
</script>

<ion-icon name={iconName}></ion-icon>
