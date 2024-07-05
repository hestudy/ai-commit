import {existsSync, mkdirSync} from 'fs';
import {LowSync} from 'lowdb';
import {JSONFileSyncPreset} from 'lowdb/node';
import {homedir} from 'os';
import {join} from 'path';

export type DB = {
	language: string;
	apiKey?: string;
	baseUrl: string;
};

export const db = (() => {
	let instance: LowSync<DB>;
	return {
		getInstance: () => {
			if (!instance) {
				const initData: DB = {
					language: 'en',
					baseUrl: 'https://api.openai.com/v1',
				};
				const configDir = join(homedir(), '.config', 'ai-commit');
				const configPath = join(configDir, 'openai.json');
				if (!existsSync(configDir)) {
					mkdirSync(configDir, {recursive: true});
				}
				instance = JSONFileSyncPreset(configPath, initData);
				instance.write();
			}
			return instance;
		},
	};
})();
