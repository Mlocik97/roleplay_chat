<script>
	/**
	 * @type {{
	 * 		image: string,
	 * 		name: string,
	 * 		description: string,
	 * 		time: Date,
	 * 		messages: number,
	 * 		link: string
	 * }}
	 */
	export let chat;
</script>

<div>
	<img src={chat.image} alt={chat.name} />
	<span>{chat.name}</span>
	<span>{chat.description}</span>
	<span>{chat.time}</span>
	<span>{chat.messages}</span>
	<a href={chat.link}>.</a>
</div>
