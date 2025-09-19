import { nodeConfig } from '../config/nodeConfig';

export const DraggableNode = ({ type, label }) => {
	const onDragStart = (event, nodeType) => {
		const appData = { nodeType };
		event.target.style.cursor = 'grabbing';
		event.dataTransfer.setData(
			'application/reactflow',
			JSON.stringify(appData)
		);
		event.dataTransfer.effectAllowed = 'move';
	};

	const icon = nodeConfig[type]?.icon || null;

	return (
		<div
			className={`cursor-grab bg-white hover:bg-blue-100 hover:scale-110 transition-all duration-300 min-w-[80px] h-[60px] flex items-center rounded-lg border border-gray-300 justify-center flex-col`}
			onDragStart={(event) => onDragStart(event, type)}
			onDragEnd={(event) => (event.target.style.cursor = 'grab')}
			draggable
		>
			{icon && <div className='mb-1'>{icon}</div>}
			<span className='text-sm'>{label}</span>
		</div>
	);
};
