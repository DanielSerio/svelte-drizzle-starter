<script lang="ts">
	import { goto } from '$app/navigation';
	import LayoutPage from '$components/layout/LayoutPage.svelte';
	import PageSection from '$components/layout/PageSection.svelte';
	import BusyState from '$components/ui/BusyState.svelte';

	export let data;

	$: if (data.success) {
		goto('/login');
	}
</script>

<LayoutPage name="confirm-account">
	<PageSection id="processing">
		<BusyState message="Processing" />
	</PageSection>
</LayoutPage>
