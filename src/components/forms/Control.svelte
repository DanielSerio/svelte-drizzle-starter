<script lang="ts">
	import type { Size } from '$lib/client/types';

	export let size: Size = 'md';
</script>

<label class="ctrl {size}">
	<slot />
</label>
