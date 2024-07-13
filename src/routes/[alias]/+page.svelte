<script lang="ts">
	export let data: {
		status: number;
		error: Error;
	};
</script>

{#if data}
	<p class="title">{data.error}</p>
{:else}
	<p class="title">Loading...</p>
{/if}

<style>
	.title {
		font-weight: bold;
		font-size: 75px;

		text-shadow: 0px 0px 20px rgba(132, 205, 125, 0.764);
		text-align: center;
	}
</style>
