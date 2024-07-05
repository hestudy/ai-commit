import {$} from 'execa';
import {Text} from 'ink';
import Spinner from 'ink-spinner';
import OpenAI from 'openai';
import React, {useEffect, useMemo, useState} from 'react';
import ConfigForm from './forms/ConfigForm.js';
import {useCOnfig} from './hooks/useConfig.js';
import {prompts} from './prompts/index.js';

export default function App() {
	const {requireConfig, config} = useCOnfig();
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState<string | null>();

	const openai = useMemo(() => {
		return new OpenAI({
			apiKey: config.apiKey,
			baseURL: config.baseUrl,
		});
	}, [config]);

	useEffect(() => {
		if (!config.apiKey || !config.baseUrl || !config.language) {
			return;
		}
		setLoading(true);
		// diff暂存文件
		$`git diff --cached`
			.then(async res => {
				try {
					const result = await openai.chat.completions.create({
						messages: [
							{
								role: 'system',
								content: prompts.system(config.language),
							},
							{
								role: 'user',
								content: res.stdout,
							},
						],
						model: 'deepseek-coder',
					});
					setContent(result.choices[0]?.message.content);
				} catch (e) {
					console.error(e);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [config]);

	if (requireConfig) {
		return <ConfigForm></ConfigForm>;
	}

	if (loading) {
		return <Spinner></Spinner>;
	}

	return <Text>{content}</Text>;
}
