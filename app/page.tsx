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

import TextUpdaterNode from './text-update-node';
import './text-updater-node.css';

const rfStyle = {
    backgroundColor: '#B8CEFF',
  };




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

    {
        id: 'node-1',
        type: 'textUpdater',
        position: { x: 0, y: 0 },
        data: { value: 123 },
      },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

const initialEdges = [];


function Flow(){

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState([]);


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