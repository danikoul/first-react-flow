'use client'
import { useState, useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { rules } from '@/rules';
import TextUpdaterNode from './text-updater-node';

import './text-updater-node.css';

const rfStyle = {
    backgroundColor: '#B8CEFF',
  };

const initialNodes = rules.map((rule, rule_index) =>( 
    rule.steps.map((step, step_index) => ({
            id: `${(step_index+1)*(rule_index+1)}`,
            position: {x: rule_index*50, y: rule_index*50},
            data: step,
            type: step_index + rule_index == 0 ? 'input' : 'default'
        }))
)).flat();



// {
//     id: '1',
//     position : {x: 5, y: 5},
//     data: { label: 'Hello' },
//     type: 'input',
// },
const nodeTypes = { textUpdater: TextUpdaterNode };

const initialEdges = [
    { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
    { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
];


function Flow(){
    console.log(initialNodes)
    const [nodes, setNodes] = useState(initialNodes.slice(0, 5));
    const [edges, setEdges] = useState(initialEdges);


    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [],
      );

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            style={rfStyle}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}
export default Flow;