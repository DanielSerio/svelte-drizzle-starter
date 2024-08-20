<script lang="ts">
	export let error: string | undefined | null = undefined;
	export let label: string;
	export let required: boolean = false;
	export let upperRightLabel: String | undefined = undefined;
</script>

<label class={`form-control ${error ? 'error' : ''}`.trimEnd()}>
	<span class="label">
		<span class="label-text">
			<span>{label}</span>
			{#if required}
				<span class="asterisk">*</span>
			{/if}
		</span>
		{#if upperRightLabel}
			<span class="label-text-alt">{upperRightLabel}</span>
		{/if}
	</span>
	<slot />
	{#if error}
		<small class="ctrl-error">{error}</small>
	{/if}
</label>
