#!/usr/bin/env node
import {render} from 'ink';
import meow from 'meow';
import React from 'react';
import App from './app.js';
import Option from './option.js';

const cli = meow(
	`
	Usage
	  $ ai-commit

	Options
		--option  -o   option setting

	Examples
	  $ ai-commit
`,
	{
		importMeta: import.meta,
		flags: {
			option: {
				type: 'boolean',
				alias: 'o',
			},
		},
	},
);

if (cli.flags.option) {
	render(<Option />);
} else {
	render(<App />);
}
