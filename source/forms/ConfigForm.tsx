import {Form} from 'ink-form';
import {useAtom} from 'jotai';
import React from 'react';
import {configAtom} from '../atoms/configAtom.js';
import {DB} from '../utils/db.js';

const ConfigForm = (props: {onSubmit?: (v: DB) => void}) => {
	const [config, setConfig] = useAtom(configAtom);

	return (
		<Form
			form={{
				sections: [
					{
						title: 'Config',
						fields: [
							{
								name: 'apiKey',
								type: 'string',
								required: true,
								initialValue: config.apiKey,
							},
							{
								name: 'baseUrl',
								type: 'string',
								required: true,
								initialValue: config.baseUrl,
							},
							{
								name: 'language',
								type: 'string',
								required: true,
								initialValue: config.language,
							},
						],
					},
				],
			}}
			onSubmit={v => {
				setConfig(v as DB);
				props.onSubmit?.(v as DB);
			}}
		></Form>
	);
};

export default ConfigForm;
