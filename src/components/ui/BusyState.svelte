<script lang="ts">
	export let message: string = 'Loading...';
</script>

<div class="busy-state">
	<div class="loader">
		<svg viewBox="0 0 14 14">
			<circle cx={7} cy={7} r={6} stroke-width="0.5" fill="transparent" stroke="var(--border-28)">
				<animate
					attributeName="opacity"
					values="0;1"
					dur="1s"
					repeatCount="indefinite"
					begin="0.125s;op.end + 0.125s;"
				/>
				<animate
					attributeName="r"
					values="0;7"
					dur="1s"
					repeatCount="indefinite"
					begin="0.125s;op.end + 0.125s;"
				/>
				<animate
					attributeName="opacity"
					values="1;0"
					dur="1s"
					repeatCount="indefinite"
					begin="0.125s;op.end + 0.125s;"
				/>
			</circle>
			<circle cx={7} cy={7} r={4} stroke-width="0.75" fill="transparent" stroke="var(--border-28)">
				<animate attributeName="opacity" values="0;1" dur="1s" repeatCount="indefinite" />
				<animate attributeName="r" values="0;7" dur="1s" repeatCount="indefinite" />
				<animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" />
			</circle>
			<circle cx={7} cy={7} r={2} fill="var(--border-28)">
				<animate
					attributeName="opacity"
					values="0;0.8;0"
					dur="1s"
					begin="0.25s;op.end + 0.25s;"
					repeatCount="indefinite"
				/>
			</circle>
		</svg>
	</div>
	<small>{message}</small>
</div>
