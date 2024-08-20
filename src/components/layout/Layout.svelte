<script lang="ts">
	export let name: string;
</script>

<div class="layout layout-{name}" id="layout">
	<slot />
</div>
