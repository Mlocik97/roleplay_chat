import { error, redirect } from "@sveltejs/kit";
import { connect, pluralize } from "mongoose";
import { config } from '$lib/server/config';
import { User } from '$lib/server/schemas/user';

pluralize(null);

// use IPv4 and not "localhost", because node from v18 translate it to IPv6 ::1, that fails if DB runs on localhost or IPv4 provider.
const db = await connect(`mongodb://127.0.0.1:27017/`, {
	dbName: 'diff-ns-app'
}).catch(console.error);

export async function handle({ event, resolve }) {
	/** 
	 * this is not correct, but it's enough for now, 
	 * cookies with multiple values are overwriten
	 * 
	 * (if we will need multiple value cookies, 
	 * rewrite to use reduce and "grouping" like feature)
	 * 
	 * @see https://github.com/sveltejs/kit/issues/10748 
	 */
	// prettier-ignore
	const cookies = Object.fromEntries(event.cookies.getAll().map((c) => [
		c.name, c.value
	]));
	const UUID = cookies.uuid ?? crypto.randomUUID();
	event.cookies.set('uuid', UUID, config);

	if (['/', '/login', '/register'].includes(event.url.pathname)) return resolve(event);
	if (db?.connection.readyState !== 1) throw error(500, 'Internal Server Error');

	/**
	 * `.exec()` is not needed, until we chain promises. 
	 * Without it, we get thenable object. 
	 * And we would need to implement generator to make it promise-like for chaining.
	 * 
	 * (this is one of big bullshits in mongoose, together with pluralize func.)
	 */
	const user = await User.findOne({ tokens: cookies.token }).exec();

	if (!user || !cookies.token) throw redirect(302, '/login');

	event.locals.user = user.toObject({ flattenMaps: true });

	/**
	 * can't serialize arbitrary non-POJO (devalue)
	 * but we need `._id` for findById queries
	 * @see https://github.com/Automattic/mongoose/issues/13895
	 */
	event.locals.user._id = String(event.locals.user._id);

	if (cookies.token) event.cookies.set('token', cookies.token, config);

	return resolve(event);
}