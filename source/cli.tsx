#!/usr/bin/env node
import {render} from 'ink';
import meow from 'meow';
import React from 'react';
import App from './app.js';

meow(
	`
	Usage
	  $ ai-commit

	Options
		--name  Your name

	Examples
	  $ ai-commit --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

render(<App />);
