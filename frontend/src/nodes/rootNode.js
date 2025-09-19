import { Tooltip } from 'react-tooltip'
import { Handle, Position } from 'reactflow';
import { nodeConfig } from '../config/nodeConfig';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const RootNode = ({
	id,
	data,
	type,
	title,
	children,
	handles = { inputs: [], outputs: [] },
	nodeStyle = {},
	titleStyle = {},
	className = '',
}) => {
	const Icon = nodeConfig[type]?.icon || null;

	const getHandlePosition = (index, total) => {
		if (total === 1) return '50%';
		return `${((index + 1) / (total + 1)) * 100}%`;
	};

	return (
		<div
			className={`${className} w-[220px] h-auto min-h-[80px] border border-black rounded-lg bg-white relative text-[12px]`}
			style={nodeStyle}
		>
			{/* Input Handles */}
			{handles.inputs.map((input, index) => (
				<>
					<Tooltip id={`handle-tooltip-${input}`} place='top' />
					<Handle
						key={`input-${index}`}
						type='target'
						position={Position.Left}
						id={`${id}-${input}`}
						className='h-[10px] w-[10px] border-2 border-black bg-white'
						data-tooltip-id={`handle-tooltip-${input}`}
						data-tooltip-content={input}
						style={{
							top: getHandlePosition(index, handles.inputs.length),
						}}
					/>
				</>
			))}

			{/* Node Content */}
			<div>
				<div className='flex items-center justify-between border-b p-2'>
					<h3
						style={titleStyle}
						className='flex items-center gap-1 font-bold text-[15px]'
					>
						{Icon && <span>{Icon}</span>}
						{title}
					</h3>
					<IoMdCloseCircleOutline
						size={18}
						className='hover:text-red-500 cursor-pointer'
					/>
				</div>
				<div className='p-2'>{children}</div>
			</div>

			{/* Output Handles */}
			{handles.outputs.map((output, index) => (
				<>
					<Tooltip id={`handle-tooltip-${output}`} place='top' />
					<Handle
						key={`output-${index}`}
						type='source'
						position={Position.Right}
						id={`${id}-${output}`}
						className='h-[10px] w-[10px] border-2 border-black bg-white'
						data-tooltip-id={`handle-tooltip-${output}`}
						data-tooltip-content={output}
						style={{
							top: getHandlePosition(index, handles.outputs.length),
						}}
					/>
				</>
			))}
		</div>
	);
};

export default RootNode;
