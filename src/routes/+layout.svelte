<script lang="ts">
	import { SvelteUIProvider } from "@svelteuidev/core";
</script>

<SvelteUIProvider themeObserver="dark">
	<slot></slot>
</SvelteUIProvider>