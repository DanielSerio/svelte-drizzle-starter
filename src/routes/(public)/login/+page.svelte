<script lang="ts">
	import LoginForm from '$components/forms/auth/LoginForm.svelte';
	import LayoutPage from '$components/layout/LayoutPage.svelte';
	import PageSection from '$components/layout/PageSection.svelte';

	export let form: null | App.FormResponse;
</script>

<LayoutPage name="login">
	<PageSection id="form">
		<LoginForm error={form?.error} />
	</PageSection>
</LayoutPage>
