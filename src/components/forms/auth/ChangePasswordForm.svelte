<script lang="ts">
	import { createFormState } from '$lib/client/hooks';
	import { ClientValidators } from '$lib/client/validation';
	import Form from '../Form.svelte';
	import FormControl from '../FormControl.svelte';
	import ConfirmPasswordField from './controls/ConfirmPasswordField.svelte';
	import PasswordField from './controls/PasswordField.svelte';

	const { values, methods, state } = createFormState({
		defaultValues: {
			password: '',
			confirmPassword: ''
		},
		validator: ClientValidators.ChangePassword
	});

	export let error: string | null | undefined = undefined;
</script>

<Form action="/register">
	<svelte:fragment slot="error">
		{#if error}
			<p>{error}</p>
		{/if}
	</svelte:fragment>
	<FormControl label="Password" required error={$state.errors.password}>
		<PasswordField bind:value={$values.password} on:blur={methods.getHandleBlur('password')} />
	</FormControl>
	<FormControl label="Confirm Password" required error={$state.errors.confirmPassword}>
		<ConfirmPasswordField
			bind:value={$values.confirmPassword}
			on:blur={methods.getHandleBlur('confirmPassword')}
		/>
	</FormControl>
	<svelte:fragment slot="footer">
		<button type="submit" disabled={!$state.isValid}>Change Password</button>
	</svelte:fragment>
</Form>
