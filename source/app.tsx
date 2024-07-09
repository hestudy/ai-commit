import {$} from 'execa';
import {Box, Text, useApp} from 'ink';
import Spinner from 'ink-spinner';
import OpenAI from 'openai';
import React, {useEffect, useMemo, useState} from 'react';
import ConfigForm from './forms/ConfigForm.js';
import {useCOnfig} from './hooks/useConfig.js';
import {prompts} from './prompts/index.js';
import SelectInput from 'ink-select-input';
import clipboard from 'clipboardy';

export default function App() {
	const {requireConfig, config} = useCOnfig();
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState<string | null>();
	const app = useApp();

	const openai = useMemo(() => {
		if (!config.apiKey) {
			return null;
		}
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
					const result = await openai?.chat.completions.create({
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
					setContent(result?.choices[0]?.message.content);
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

	return (
		<Box flexDirection="column">
			<Box>
				<Text>{content}</Text>
			</Box>
			<Box>
				<SelectInput
					items={[
						{
							label: 'copy to clipboard',
							value: 'copy',
						},
					]}
					onSelect={item => {
						if (item.value === 'copy' && content) {
							clipboard.writeSync(content);
							app.exit();
						}
					}}
				></SelectInput>
			</Box>
		</Box>
	);
}
