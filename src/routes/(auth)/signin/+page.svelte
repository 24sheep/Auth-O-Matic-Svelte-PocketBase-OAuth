<script lang="ts">
	import { sessionStore } from '$lib/utils';
    import type { PageData } from './$types';
    import {PUBLIC_OAUTH_REDIRECT} from '$lib/constants';
    import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';

    export let form;
    export let data: PageData;

    let loading = false;

    //--------------------------------------------------------------------------------
    // Email/Password Form Functions
    //--------------------------------------------------------------------------------
    const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'invalid':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

    //--------------------------------------------------------------------------------
    // OAuth2 Functions
    //--------------------------------------------------------------------------------
    function gotoAuthProvider(providerData: object) {

        if (browser && providerData){
            const jsonProvider = JSON.stringify(providerData);
            document.cookie = `oauth=${jsonProvider}`;
            sessionStorage.removeItem('oauths');
            sessionStore('oauths', jsonProvider);
            const redirectURL = `${providerData.authUrl}${PUBLIC_OAUTH_REDIRECT}`;
            window.location.href = redirectURL || '';
        }
    }

    function getProviderImageName(name: string = 'bitcoin') {
		if (name === 'discord') name = 'discord-alt';
		let imageProvider = `bxl:${name}`

        if (name == 'kakao') imageProvider = `simple-icons:kakaotalk`;

		return imageProvider;
    }


</script>

<!-- OAuth2 Stuff -->
<class class="flex animate-fade-in flex-col justify-center text-center">
    {#if (!data.isVerifyEmail)}

    <div class="card w-96 bg-neutral text-neutral-content mx-auto mt-6 max-w-[18rem]">
        <div class="card-body items-center text-center">
          <span class="text-sm font-medium text-gray-300 pb-4">Create a new account<br />
            or Sign in existing with...</span>

            <div class="card-actions justify-center text-center">

            {#each data.authProviders as p}

                <button class="btn btn-outline btn-wide gap-2" on:click={gotoAuthProvider(p)}>
                    <span class="justify-center">
						<img alt= "{p.name}"
						src="https://api.iconify.design/{getProviderImageName(p.name)}.svg?color=%23888888" /></span>
                    <span>{p.name}</span>
                </button>

            {/each}

            </div>
        </div>
    </div>

    {/if}



{#if (!data.isVerifyEmail)}

<div class="flex flex-col items-center h-full w-full pt-8 ">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Email account Sign in
	</h2>

    {#if (!data.isVerifyEmail)}

    <p class="text-center mt-1">
		Or <a href="/register-email" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>register</a
		> if you don't already have an account.
	</p>

    {/if}

    {#if (data.isVerifyEmail)}
	<p class="text-center mt-1">Thank you for verifying your email. Ready to login?</p>
    {/if}

	<form
		action="?/login"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-4"
		use:enhance={submitLogin}
	>
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email}
			disabled={loading}
		/>
		<Input
			type="password"
			id="password"
			label="Password"
			errors={form?.errors?.password}
			disabled={loading}
		/>
		<div class="w-full max-w-lg">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline"
			>
				Forgot Password?</a
			>
		</div>

		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary w-full" disabled={loading}>Login</button>
		</div>

		{#if form?.notVerified}

			<div class="alert alert-error shadow-lg w-full max-w-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>You must verify your email before you can login.</span>
				</div>
			</div>

		{/if}

	</form>
</div>

{/if}


    <p class="mx-auto mt-6 max-w-[18rem] text-xs text-gray-500">
        By signing in, you agree to our
        <a href="/terms">Terms of Service</a> and
        <a href="/privacy">Privacy Policy</a>.
    </p>
</class>