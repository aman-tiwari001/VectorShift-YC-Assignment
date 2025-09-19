import RootNode from './rootNode';
import NodeFields from './nodeFields';
import { nodeConfig } from '../config/nodeConfig';
import { useEffect, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';

const AbstractNode = ({ id, data, type }) => {
	const config = nodeConfig[type];
	const updateNodeInternals = useUpdateNodeInternals();

	const [handles, setHandles] = useState(
		config?.handles || { inputs: [], outputs: [] }
	);

	useEffect(() => {
		// Notify React Flow that the node handles have changed
		updateNodeInternals(id);
	}, [handles, id, updateNodeInternals]);

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
				type={type}
				setHandles={setHandles}
			/>
		</RootNode>
	);
};

export default AbstractNode;
