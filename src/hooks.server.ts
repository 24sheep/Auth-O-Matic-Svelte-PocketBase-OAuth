import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_PB_URL, PUBLIC_IS_PRODUCTION, COOKIE_NAME } from '$lib/constants';

export const handle = (async ({ event, resolve }) => {
	const cookie = event.request.headers.get('cookie');
	event.locals.pb = new PocketBase(PUBLIC_PB_URL);
	event.locals.pb.authStore.loadFromCookie(cookie || '', COOKIE_NAME);

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);

			if (!PUBLIC_IS_PRODUCTION) console.log('User:', event.locals.user.username);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;

		if (!PUBLIC_IS_PRODUCTION) console.log('User: authStore cleared');
	}

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: PUBLIC_IS_PRODUCTION, sameSite: 'lax' })
	);

	if (!PUBLIC_IS_PRODUCTION) console.log('User:', event.locals.user?.username);

	return response;
}) satisfies Handle;
