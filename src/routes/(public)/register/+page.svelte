<script lang="ts">
	import RegisterForm from '$components/forms/auth/RegisterForm.svelte';
	import LayoutPage from '$components/layout/LayoutPage.svelte';
	import PageSection from '$components/layout/PageSection.svelte';

	export let form: null | App.FormResponse;
</script>

<LayoutPage name="register">
	<PageSection id="form">
		<RegisterForm error={form?.error} />
	</PageSection>
</LayoutPage>
