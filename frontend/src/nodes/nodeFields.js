import { nodeConfig } from '../config/nodeConfig';
import { useStore } from '../store/store';

const NodeFields = ({ nodeId, fields, data, type, setHandles }) => {
	const updateNodeField = useStore((state) => state.updateNodeField);

	const updateHandles = (value) => {
		// Find all variables contained in text value by matching {{var_name}} pattern
		const regex = /{{(.*?)}}/g;
		const matches = [];
		let match;
		while ((match = regex.exec(value)) !== null) {
			matches.push(match[1]);
		}
		console.log('Extracted variables:', matches);

		// Create input handles for each variable if not already present
		if (matches.length > 0) {
			setHandles((prev) => ({
				outputs: nodeConfig[type]?.handles?.outputs || [],
				inputs: Array.from(
					new Set([...nodeConfig[type]?.handles?.inputs, ...matches])
				),
			}));
		}
	};

	const handleFieldChange = (fieldName, value) => {
		updateHandles(value);
		updateNodeField(nodeId, fieldName, value);
	};

	const renderField = (field) => {
		const value = data?.[field.name] || field.defaultValue || '';

		switch (field.type) {
			case 'text':
				return (
					<div key={field.name} className='text-[13px] mb-2'>
						<label>{field.label}:</label>
						<input
							type='text'
							className='w-full border bg-black/4 text-black font-semibold border-gray-400 rounded px-2 py-1'
							placeholder={field.placeholder || ''}
							value={value}
							onChange={(e) => handleFieldChange(field.name, e.target.value)}
						/>
					</div>
				);

			case 'textarea':
				return (
					<div key={field.name} className='text-[13px] mb-2'>
						<label>{field.label}:</label>
						<textarea
							className='w-full border max-h-[90px] bg-black/4 text-black font-semibold border-gray-400 rounded px-2 py-1'
							placeholder={field.placeholder || ''}
							onChange={(e) => handleFieldChange(field.name, e.target.value)}
							rows={1}
							onInput={(e) => {
								e.target.style.height = `${e.target.scrollHeight}px`;
							}}
						/>
					</div>
				);

			case 'select':
				return (
					<div key={field.name} className='text-[13px] mb-2'>
						<label>{field.label}:</label>
						<select
							className='w-full border bg-black/4 text-black font-semibold border-gray-400 rounded px-2 py-1'
							value={value}
							onChange={(e) => handleFieldChange(field.name, e.target.value)}
						>
							{field.options.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
				);

			default:
				return null;
		}
	};

	return <div>{fields.map(renderField)}</div>;
};

export default NodeFields;
