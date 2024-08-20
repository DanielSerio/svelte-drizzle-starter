<script lang="ts">
	import { createFormState } from '$lib/client/hooks';
	import { CommonValidators } from '$lib/common/validation';
	import Form from '../Form.svelte';
	import FormControl from '../FormControl.svelte';
	import ConfirmPasswordField from './controls/ConfirmPasswordField.svelte';
	import EmailField from './controls/EmailField.svelte';
	import PasswordField from './controls/PasswordField.svelte';

	const { values, methods, state } = createFormState({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		validator: CommonValidators.UserRegister
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
	<FormControl label="Confirm Password" required error={$state.errors.confirmPassword}>
		<ConfirmPasswordField
			bind:value={$values.confirmPassword}
			on:blur={methods.getHandleBlur('confirmPassword')}
		/>
	</FormControl>
	<p slot="helpers">
		Already have an account? <a href="/login">Log in here</a>
	</p>
	<svelte:fragment slot="footer">
		<button type="submit" disabled={!$state.isValid}>Register Now!</button>
	</svelte:fragment>
</Form>
