<script lang="ts">
	import LayoutPage from '$components/layout/LayoutPage.svelte';
	import PageHeader from '$components/layout/PageHeader.svelte';
	import PageSection from '$components/layout/PageSection.svelte';
</script>

<LayoutPage name="landing">
	<svelte:fragment slot="head">
		<title>Landing</title>
	</svelte:fragment>
	<PageHeader slot="header">
		<h1>Landing</h1>
	</PageHeader>
	<PageSection id="intro">
		<article>
			<h1>Intro</h1>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam similique optio
				expedita nam architecto aliquam sed eos tempora cum quam velit consequuntur, temporibus
				voluptatum dolore cupiditate eius nesciunt illo qui.
			</p>
		</article>
	</PageSection>
</LayoutPage>
