<script lang="ts">
	import Control from '$components/forms/Control.svelte';

	export let disabled: boolean = false;
	export let placeholder: string | undefined = undefined;
	export let name: string;
	export let value: string;

	$: isVisible = false;
</script>

<Control>
	{#if isVisible}
		<input type="text" {name} {placeholder} {disabled} bind:value on:blur on:focus on:change />
	{:else}
		<input type="password" {name} {placeholder} {disabled} bind:value on:blur on:focus on:change />
	{/if}
	<button type="button" class="btn ctrl-btn" on:click={() => (isVisible = !isVisible)}>*</button>
</Control>
