// toolbar.js

import { DraggableNode } from './draggableNode';
// NEW: Import nodeConfig to dynamically generate toolbar nodes
// This automatically includes all node types without manual updates
import { nodeConfig } from '../config/nodeConfig';
import { PiShareNetwork } from 'react-icons/pi';
import { SubmitButton } from './submit';

export const PipelineToolbar = () => {
	// NEW: Separate original nodes from demo nodes for better organization
	// const originalNodes = ['customInput', 'llm', 'customOutput', 'text'];
	const demoNodes = Object.keys(nodeConfig);

	return (
		<div>
			<div className='flex justify-between border-b border-gray-400 px-2 py-1'>
				{' '}
				<h1 className='flex items-center gap-1 text-md'>
					<PiShareNetwork /> Pipeline
				</h1>
				<SubmitButton />
			</div>

			{/* Demo nodes */}
			<div className='bg-gray-50 pb-2 border-b border-gray-400'>
				{demoNodes.length > 0 && (
					<div className='px-2'>
						<h3 className='font-bold mb-1'>Demo Nodes</h3>
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: '10px',
							}}
						>
							{demoNodes.map((nodeType) => (
								<DraggableNode
									key={nodeType}
									type={nodeType}
									label={nodeConfig[nodeType].title}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
