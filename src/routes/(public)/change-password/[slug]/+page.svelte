<script lang="ts">
	import ChangePasswordForm from '$components/forms/auth/ChangePasswordForm.svelte';
	import LayoutPage from '$components/layout/LayoutPage.svelte';
	import PageSection from '$components/layout/PageSection.svelte';

	export let form: null | App.FormResponse;
</script>

<LayoutPage name="change-password">
	<PageSection id="form">
		<ChangePasswordForm error={form?.error} />
	</PageSection>
</LayoutPage>
