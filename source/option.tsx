import {StatusMessage} from '@inkjs/ui';
import {Box, useApp} from 'ink';
import React, {useState} from 'react';
import ConfigForm from './forms/ConfigForm.js';

const Option = () => {
	const app = useApp();
	const [show, setShow] = useState(false);

	return (
		<Box flexDirection="column">
			<ConfigForm
				onSubmit={() => {
					setShow(true);
					setTimeout(() => {
						app.exit();
					});
				}}
			></ConfigForm>
			{show && <StatusMessage variant="success">config success</StatusMessage>}
		</Box>
	);
};

export default Option;
