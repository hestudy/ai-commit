import {atom} from 'jotai';
import {db} from '../utils/db.js';

export type DB = {
	language: string;
	apiKey?: string;
	baseUrl: string;
};

export const sourceConfigAtom = atom<DB | null>(null);

export const configAtom = atom(
	get => {
		return get(sourceConfigAtom) || db.getInstance().data;
	},
	(get, set, value: DB) => {
		db.getInstance().update(v => {
			v.baseUrl = value.baseUrl;
			v.apiKey = value.apiKey;
			v.language = value.language;
		});
		db.getInstance().write();
		set(sourceConfigAtom, {
			...get(sourceConfigAtom),
			...value,
		});
	},
);
