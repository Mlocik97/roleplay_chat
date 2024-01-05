<script>
	/**
	 * @type {{
	 * 		name: string,
	 * 		image: string,
	 * 		author: string,
	 * 		description: string
	 * }}
	 */
	export let bot;
</script>

<div>
	<span>{bot.name}</span>
	<img alt={bot.name} src={bot.image} />
	<span>{bot.author}</span>
	<span>{bot.description}</span>
</div>

<style>
</style>
