<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';

	export let data;
</script>

<Toaster />

<div class="min-h-full">
  <div class="navbar bg-base-100">
    <div class="navbar-start">

      <a href="/" class="btn btn-ghost normal-case text-xl">Sveltekit + PocketBase + (dynamic) OAuth2</a>
    </div>

    <div class="navbar-end mx-2">
        {#if !data.user}

            <a href="/signin" class="btn btn-primary ml-1">Sign in</a>

        {:else}
            <a href="/my" class="btn btn-primary ml-1">My Protected</a>
            <form action="/signout" method="POST">
                <button type="submit" class="btn ml-1">Logout</button>
            </form>
        {/if}

    </div>
  </div>

  <div class="py-4">
	  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		  <slot />
		</div>
	</div>

</div>
