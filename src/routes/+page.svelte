<script lang="ts">
	import {
		Alert,
		Badge,
		Button,
		Card,
		Group,
		Stack,
		Space,
		Text,
		TextInput
	} from '@svelteuidev/core';
	import { browser } from '$app/environment';
	import LinkData from '../lib/linkData';
	import { InfoCircled } from 'radix-icons-svelte';
	import type { AlertType } from '../types/alert';

	let origin: string;
	if (browser) {
		origin = window.location.origin;
	}

	// state variables
	let longLink = '',
		alias = '',
		alert: AlertType | null = null;

	// link data
	let linkData = new LinkData();

	function addLink() {
		// check: valid link?
		try {
			new URL(longLink);
		} catch (error) {
			alert = {
				title: 'Invalid Link',
				message: 'Please enter a valid link'
			};
			return;
		}

		// check: alias is not empty
		if (alias === '') {
			alert = {
				title: 'Invalid Alias',
				message: 'Please enter an alias'
			};
			return;
		}

		// TODO - check: alias already exists?

		linkData.addLink(longLink, alias);
		linkData = linkData; // force update
		longLink = '';
		alias = '';
		alert = null;
	}
</script>

<main id="main-container">
	<Stack
		override={{
			margin: '1vw',
			justifyContent: 'start',
		}}
	>
		<Stack id="register-alias">
			<Text size="xl" weight="bold">Add an alias to a link</Text>
			<TextInput bind:value={longLink} label={'Long Link'} placeholder="Long Link" />
			<TextInput
				bind:value={alias}
				override={{ color: 'white' }}
				label={`${origin}/`}
				placeholder="Alias"
			/>
			<Button color="green" variant="light" fullSize on:click={() => addLink()}></Button>
		</Stack>
		{#if alert}
			<Alert icon={InfoCircled} title={alert.title}>
				{alert.message}
			</Alert>
		{/if}

		<Space override={{ flex: 1 }} />

		<Stack id="view-links">
			<Text size="xl" weight="bold">Shortened Links</Text>
			<Stack
				override={{
					border: '1px solid #222222',
					borderRadius: '10px',
					paddingTop: '1vw',
					paddingBottom: '1vw',
					transition: 'all 0.2s ease-in-out',
					flex: "1 1 auto",
					overflowY: "scroll",
					'&:hover': {
						border: '1px solid #777777',
						backgroundColor: 'rgba(10, 10, 10, 0.4)',
						transition: 'all 0.2s ease-in-out'
					}
				}}
			>
				{#each linkData.links as link}
					<Card override={{background: "transparent !important", border: "0 !important"}}>
						<Group position="apart">
							<Text weight="bold">{`${origin}/${link.alias}`}</Text>
							<Badge color="yellow" variant="light">{`${link.views} views`}</Badge>
						</Group>
						<Text size="sm" override={{marginTop: "1vh"}}>
							URL: {link.url}
						</Text>
					</Card>
				{/each}
				{#if linkData.links.length === 0}
					<Text align="center">No links registered yet.</Text>
				{/if}
			</Stack>
		</Stack>
	</Stack>

	<div id="right-column">
		<p class="title">Link Shortener</p>
		<p class="title small">by AJR07</p>
		
		<img id="link-image" src="/link.png" alt="link" />
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

	#link-image {
		width: 20vw;
		bottom: 0;
		right: 0;
		position: absolute;
		margin: 2vw;
	}
</style>
