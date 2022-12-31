import { error } from '@sveltejs/kit';
import { serializeNonPOJOs, roleRequired } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	// Route protection
	roleRequired(locals.user, 'user');

	const getCollection = async () => {
		try {
			const collection = serializeNonPOJOs(await locals.pb.collection('accounts').getFullList());
			return collection;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	return {
		accounts: getCollection()
	};
};
