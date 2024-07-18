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

const initialNodes = [
    {
        id: '1',
        position : {x: 5, y: 5},
        data: { label: 'Hello' },
        type: 'input',
    },

    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: 'World' },
    },
];

const initialEdges = [];


function Flow(){

    const [nodes, setNodes] = useState(initialNodes);
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
        (params) => setEdges((eds) => addEdge(params, eds)),
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
            fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}
export default Flow;