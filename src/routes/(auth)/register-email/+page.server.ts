import { error, fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { validateData, generateUsername } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

// Do we have a valid session?

export const actions: Actions = {
	registerEmail: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const email: string = formData.email;
		const username = generateUsername(email);
		const slug = username;
		const role = 'user';

		try {
			await locals.pb.collection('users').create({ username, slug, role, ...formData });
			await locals.pb.collection('users').requestVerification(email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/my');
	}
};
