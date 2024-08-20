<script lang="ts">
	import Control from '$components/forms/Control.svelte';

	export let disabled: boolean = false;
	export let placeholder: string | undefined = undefined;
	export let value: string;
</script>

<Control>
	<input type="email" name="email" {placeholder} {disabled} bind:value on:blur on:focus on:change />
</Control>
