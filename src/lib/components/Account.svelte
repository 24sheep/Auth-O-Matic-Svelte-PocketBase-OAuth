<script lang="ts">

	interface Account {
		name: string,
        api: string,
		key: string,
		exchange_id: string,
		owner_id: string
	}

	export let account: Account
</script>


<div class="p-2  rounded-lg shadow-none   w-2/3">
	<a href="/my/accounts/{account?.id}" class="btn bg-slate-400 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer w-1/2">
		<h3 class="text-xl font-semibold text-gray-800">{account?.name}</h3>
	</a>
</div>


