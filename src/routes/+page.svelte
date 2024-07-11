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
	import { InfoCircled, MagnifyingGlass } from 'radix-icons-svelte';
	import type { AlertType } from '../types/alert';

	let origin: string;
	if (browser) {
		origin = window.location.origin;
	}

	// state variables
	let longLink = '',
		alias = '',
		alert: AlertType | null = null,
		searchTerm = '';

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
	<div id="right-container">
		<Stack id="register-alias">
			<Text size="xl" weight="bold">Add an alias to a link</Text>
			<TextInput bind:value={longLink} label={'Long Link'} placeholder="Long Link" />
			<TextInput
				bind:value={alias}
				override={{ color: 'white' }}
				label={`${origin}/`}
				placeholder="Alias"
			/>
			<Button color="green" variant="light" fullSize on:click={() => addLink()}>Add</Button>
			{#if alert}
				<Alert icon={InfoCircled} title={alert.title}>
					{alert.message}
				</Alert>
			{/if}
		</Stack>

		<Stack id="view-links">
			<Text size="xl" weight="bold">Shortened Links</Text>
			<TextInput bind:value={searchTerm} placeholder="Alias To Search" icon={MagnifyingGlass} />
			<Stack
				override={{
					border: '1px solid #222222',
					borderRadius: '10px',
					paddingTop: '1vw',
					paddingBottom: '1vw',
					transition: 'all 0.2s ease-in-out',
					'&:hover': {
						border: '1px solid #777777',
						backgroundColor: 'rgba(10, 10, 10, 0.4)',
						transition: 'all 0.2s ease-in-out'
					}
				}}
			>
				{#each linkData.links as link}
					{#if searchTerm === '' || link.alias.includes(searchTerm)}
						<Card override={{ background: 'transparent !important', border: '0 !important' }}>
							<Group position="apart">
								<Text weight="bold">
									<a href={`${origin}/${link.alias}`}>{`${origin}/${link.alias}`}</a>
								</Text>
								<Badge color="yellow" variant="light">{`${link.views} views`}</Badge>
							</Group>
							<Text lineClamp={1} size="sm" override={{ marginTop: '1vh' }}>
								URL: <a href={link.url}>{link.url}</a>
							</Text>
						</Card>
					{/if}
				{/each}
				{#if linkData.links.length === 0}
					<Text align="center">No links registered yet.</Text>
				{/if}
			</Stack>
		</Stack>
	</div>

	<div id="right-column">
		<p class="title">Link Shortener</p>
		<p class="title small">by AJR07</p>

		<img id="link-image" src="/link.png" alt="link" />
	</div>
</main>

<style>
	a {
		color:antiquewhite;
	}
	#main-container {
		display: grid;
		grid-template-columns: 1fr 1fr;

		height: 100vh;
		background-image: linear-gradient(to bottom right, black, rgb(0, 19, 5), rgb(0, 99, 25));
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

	#right-container {
		display: flex;
		flex-direction: column;
		gap: 1vw;
		margin: 1vw;
		justify-content: start;
		overflow-y: scroll;

		/* No Scroll */
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	#right-container::-webkit-scrollbar {
		display: none;
	}
</style>
