import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { validateData, sqlTimeNow, roleRejected } from '$lib/utils';
import { loginUserSchema } from '$lib/schemas';

const lastSignIn = sqlTimeNow();

interface AuthProvider {
	name: string;
	state: string;
	codeVerifier: string;
	codeChallenge: string;
	codeChallengeMethod: string;
	authUrl: string;
}

//--------------------------------------------------------------------------------
// Email/Password Form Functions
//--------------------------------------------------------------------------------

export const actions = {
	login: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const reply = await locals.pb
				.collection('users')
				.authWithPassword(formData.email, formData.password);

			// UPDARE LAST SIGNIN
			await locals.pb.collection('users').update(reply.record.id, { last_signin_at: lastSignIn });

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		// PROTECTED ROUTE
		throw redirect(303, '/my');
	}
};

//--------------------------------------------------------------------------------
// OAuth2 Functions
//--------------------------------------------------------------------------------
export const load: PageServerLoad = async ({ locals, request, url }) => {
	// Double Signin protection
	roleRejected(locals.user);

	// Get query params for 'fromEmail'
	// if (true) { Don't render OAuth buttons

	const query = new URLSearchParams(url.search);
	const isVerifyEmail = query.get('isVerifyEmail') || false;

	const getAuthProviders = async () => {
		try {
			const { authProviders } = await locals.pb.collection('users').listAuthMethods();
			const recordsObject: { [key: string]: AuthProvider } = {};

			authProviders.forEach((record) => {
				recordsObject[record.name] = record;
			});

			const authProvidersJson = JSON.stringify(recordsObject);

			return { ap: authProviders, apj: authProvidersJson };
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const providers = await getAuthProviders();

	return {
		authProviders: providers.ap,
		authProvidersJson: providers.apj,
		isVerifyEmail: isVerifyEmail
	};
};
