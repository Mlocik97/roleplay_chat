import { Schema, model } from 'mongoose';

export const Schema_User = new Schema({
	mail: { type: String, unique: true, required: true },
	password: { type: String, unique: true, required: true },
	tokens: [{ type: String, unique: true }],
});

export const User = model('user', Schema_User, 'user');

export default User;