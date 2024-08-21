<script lang="ts">
	import { page } from '$app/stores';
	import Layout from '$components/layout/Layout.svelte';
	import LayoutPage from '$components/layout/LayoutPage.svelte';
</script>

<Layout name="error">
	<LayoutPage name="error">
		<p>{$page.status}: {$page.error?.message}</p>
	</LayoutPage>
</Layout>
