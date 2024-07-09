<script lang="ts">
	import { Stack, Text, TextInput } from '@svelteuidev/core';
	import { browser } from '$app/environment'

	let origin: string;
	if (browser) {
		origin = window.location.origin;
	}

	let longLink = "", alias = "";
</script>

<main id="main-container">
	<Stack override={{
		margin: "1vw"
	}}>
 	<Text size="xl"weight="bold">Add a link alias</Text>
		<TextInput bind:value={longLink} label={"Long Link"} placeholder="Long Link"/>
		<TextInput bind:value={alias} override={{color: "white"}} label={`${origin}/`} placeholder="Alias"/>
	</Stack>

	<div id="right-column">
		<p class="title">Link Shortener</p>
		<p class="title small">by AJR07</p>
	</div>
</main>

<style>
	#main-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		
		height: 100vh;
		background-image: linear-gradient(to bottom right, black, black, rgb(0, 99, 25));
	}

    .title {
        font-weight: bold;
        font-size: 75px;
        
		text-shadow: 0px 0px 20px rgba(132, 205, 125, 0.764);
		text-align: right;
		margin-right: 10%;
    }

	.small {
		font-size: 40px;
	}
</style>