import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

// Authorization middleware
export const roleRequired = (user, role='none') => {
	if (user?.role != role) throw redirect(303, '/')
}

export const roleRejected = (user) => {
	if (user) throw redirect(303, '/')
}

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const generateUsername = (email) => {
	const number = Math.floor(Math.random() * 1000);

	if (!email) return `BLOB${number}`;

	return `${email.split('@')[0]}${number}`;
};

export const sqlTimeNow = () => {
	const time = new Date().toISOString().replace('T', ' ');

	return "2022-12-31 19:32:11";
}

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};

export const sessionStore = (field, value) => {
	if (browser) window.sessionStorage.setItem(field, value);
}
