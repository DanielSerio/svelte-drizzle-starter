<script lang="ts">
	export let action: string;
	export let method: 'PUT' | 'POST' | 'DELETE' | 'PATCH' = 'POST';
</script>

<form {method} class="form form-{`${action}`.replace(/[\/?]/g, '')}">
	{#if $$slots.header}
		<header>
			<slot name="header" />
		</header>
	{/if}
	{#if $$slots.error}
		<div class="form-error">
			<slot name="error" />
		</div>
	{/if}
	<div class="body">
		<slot />
	</div>
	{#if $$slots.helpers}
		<slot name="helpers" />
	{/if}
	<footer>
		<slot name="footer" />
	</footer>
</form>
