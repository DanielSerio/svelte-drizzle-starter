<script lang="ts">
	import PasswordField from '$components/controls/PasswordField.svelte';
	export let disabled: boolean = false;
	export let placeholder: string | undefined = undefined;
	export let value: string;
</script>

<PasswordField name="password" {disabled} {placeholder} bind:value on:blur on:change on:focus />
