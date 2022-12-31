<script>
	import { Account } from '$lib/components';

	export let data;


</script>


<div class="w-full mt-4 flex flex-col items-center">
	{#if data.accounts.length === 0}
		<p class="text-center text-3xl">☹️</p>
		<p class="text-center text-3xl">Looks like you don't have anything yet...</p>
		<a href="/projects/new" class="btn btn-primary max-w-md mt-4">Add One</a>
	{:else}
		{#each data.accounts as account}
			<Account {account} />
		{/each}
	{/if}
</div>






