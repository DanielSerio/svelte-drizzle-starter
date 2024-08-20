<script lang="ts">
	import Icon from '$components/ui/Icon.svelte';
	import type { IconProps, Size } from '$lib/client/types';

	export let variant: string | undefined = undefined;
	export let size: Size = 'md';
	export let type: 'submit' | 'reset' | 'button' = 'button';
	export let icon: IconProps | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
</script>

{#if type === 'submit'}
	<button class="btn{variant ? ` btn-${variant}` : ''} {size}" {disabled} type="submit" on:click>
		{#if icon}
			<span class="text">
				<slot />
			</span>
			<span class="icon">
				<Icon {...icon} />
			</span>
		{:else}
			<span class="text">
				<slot />
			</span>
			<span class="icon">
				<Icon name="send" />
			</span>
		{/if}
	</button>
{:else if type === 'reset'}
	<button class="btn{variant ? ` btn-${variant}` : ''} {size}" {disabled} type="reset" on:click>
		{#if icon}
			<span class="text">
				<slot />
			</span>
			<span class="icon">
				<Icon {...icon} />
			</span>
		{:else}
			<span class="text">
				<slot />
			</span>
			<span class="icon">
				<Icon name="refresh" />
			</span>
		{/if}
	</button>
{:else}
	<button class="btn{variant ? ` btn-${variant}` : ''} {size}" {disabled} type="button" on:click>
		{#if icon}
			<span class="text">
				<slot />
			</span>
			<span class="icon">
				<Icon {...icon} />
			</span>
		{:else}
			<slot />
		{/if}
	</button>
{/if}
