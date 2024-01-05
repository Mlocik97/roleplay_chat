<script>
	import BotPreview from '$lib/components/BotPreview.svelte';
	import ChatPreview from '$lib/components/ChatPreview.svelte';

	export let data;
</script>

<ul>
	{#each data.chats as chat}
		<li>
			<ChatPreview {chat} />
		</li>
	{/each}
</ul>

<ul>
	{#each data.bots ?? [] as bot}
		<li>
			<BotPreview {bot} />
		</li>
	{/each}
</ul>
