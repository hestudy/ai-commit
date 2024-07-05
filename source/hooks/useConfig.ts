import {useAtom} from 'jotai';
import {useCallback, useMemo} from 'react';
import {configAtom} from '../atoms/configAtom.js';

export const useCOnfig = () => {
	const [config, setConfig] = useAtom(configAtom);

	const getKey = useCallback(() => {
		return config.apiKey;
	}, [config.apiKey]);

	const requireConfig = useMemo(() => {
		return !getKey();
	}, [getKey]);

	return {
		config,
		setConfig,
		getKey,
		requireConfig,
	};
};
