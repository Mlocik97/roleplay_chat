import { pluralize } from "mongoose";

pluralize(null);

/** @type {import('cookie').CookieSerializeOptions} */
export const config = {
	maxAge: 7 * 24 * 60 * 60,
	path: '/'
};