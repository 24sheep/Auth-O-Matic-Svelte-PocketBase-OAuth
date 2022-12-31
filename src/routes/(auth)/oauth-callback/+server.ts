import { redirect } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { sqlTimeNow } from '$lib/utils';
import { PUBLIC_OAUTH_REDIRECT } from '$lib/constants';

const lastSignIn = sqlTimeNow();

export const GET: RequestHandler = async ({ locals, url, cookies }: RequestEvent) => {
	// Get query params
	const query = new URLSearchParams(url.search);
	const qState = query.get('state') || '';
	const qCode = query.get('code') || '';

	// Get cookie
	const cookieOauth = cookies.get('oauth');
	const oauthObject = JSON.parse(cookieOauth);

	// Assign cookie values to variables
	const cookieProvider = oauthObject.name;
	const cookieState = oauthObject.state;
	const cookieCodeVerifier = oauthObject.codeVerifier;

	if (!cookieProvider) {
		console.log('Provider not found');
		throw redirect(303, '/signin');
	}

	if (cookieState !== qState) {
		console.log('state does not match cookie', cookieState, qState);
		throw redirect(303, '/signin');
	}

	try {
		const reply = await locals.pb
			.collection('users')
			.authWithOAuth2(cookieProvider, qCode, cookieCodeVerifier, PUBLIC_OAUTH_REDIRECT, {
				last_signin_at: lastSignIn,
				provider: cookieProvider,
				role: 'user'
			});

		// UPDARE LAST SIGNIN
		await locals.pb.collection('users').update(reply.record.id, {
			last_signin_at: lastSignIn,
			updated: lastSignIn
		});
	} catch (err) {
		console.log('Error logging in with 0Auth user', err);
	}

	// Prtotected route
	throw redirect(303, '/my');
};
