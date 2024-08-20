<script lang="ts">
	export let name: string;
</script>

<svelte:head>
	{#if $$slots.head}
		<slot name="head" />
	{/if}
</svelte:head>

<div class="page page-{name}" id="page">
	<slot name="header" />
	{#if $$slots.aside}
		<aside id="aside">
			<slot name="aside" />
		</aside>
	{/if}
	<main id="content">
		<slot />
	</main>
</div>
