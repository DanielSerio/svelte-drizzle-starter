<script lang="ts">
	import { createFormState } from '$lib/client/hooks';
	import { CommonValidators } from '$lib/common/validation';
	import Form from '../Form.svelte';
	import FormControl from '../FormControl.svelte';

	import EmailField from './controls/EmailField.svelte';
	import PasswordField from './controls/PasswordField.svelte';

	const { values, methods, state } = createFormState({
		defaultValues: {
			email: '',
			password: ''
		},
		validator: CommonValidators.UserLogin
	});

	export let error: string | null | undefined = undefined;
</script>

<Form action="/register">
	<svelte:fragment slot="error">
		{#if error}
			<p>{error}</p>
		{/if}
	</svelte:fragment>
	<FormControl label="Email" required error={$state.errors.email}>
		<EmailField bind:value={$values.email} on:blur={methods.getHandleBlur('email')} />
	</FormControl>
	<FormControl label="Password" required error={$state.errors.password}>
		<PasswordField bind:value={$values.password} on:blur={methods.getHandleBlur('password')} />
	</FormControl>
	<p slot="helpers">
		Don't have an account? <a href="/register">Register here!</a>
	</p>
	<svelte:fragment slot="footer">
		<button type="submit" disabled={!$state.isValid}>Log In</button>
	</svelte:fragment>
</Form>
