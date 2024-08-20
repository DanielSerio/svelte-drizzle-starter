<script lang="ts">
	import LayoutPage from '$components/layout/LayoutPage.svelte';
	import PageSection from '$components/layout/PageSection.svelte';
	import BusyState from '$components/ui/BusyState.svelte';
</script>

<LayoutPage name="confirm-account">
	<PageSection id="processing">
		<BusyState message="Processing" />
	</PageSection>
</LayoutPage>
