<script>
	import { getSings } from './api/signs/get_signs.remote';
</script>

<h1>Sign Book</h1>

{#each await getSings() as sign (sign.id)}
	<li>
		{sign.name} wrote {sign.description}
	</li>
{/each}

<ul></ul>
