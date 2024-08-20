<script lang="ts">
	import PublicHeader from '$components/headers/PublicHeader.svelte';
	import Layout from '$components/layout/Layout.svelte';
</script>

<Layout name="public">
	<PublicHeader />
	<slot />
</Layout>
