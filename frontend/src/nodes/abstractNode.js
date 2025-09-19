import RootNode from './rootNode';
import NodeFields from './nodeFields';
import { nodeConfig } from '../config/nodeConfig';
import { useState } from 'react';

const AbstractNode = ({ id, data, type }) => {
	const config = nodeConfig[type];

	const [handles, setHandles] = useState(
		config?.handles || { inputs: [], outputs: [] }
	);

	if (!config) {
		return (
			<RootNode id={id} data={data} title='Unknown Node'>
				<div>Unknown node type: {type}</div>
			</RootNode>
		);
	}

	return (
		<RootNode
			id={id}
			data={data}
			type={type}
			title={config.title}
			handles={handles}
			nodeStyle={config.style}
		>
			<NodeFields
				nodeId={id}
				fields={config.fields}
				data={data}
				setHandles={setHandles}
			/>
		</RootNode>
	);
};

export default AbstractNode;
