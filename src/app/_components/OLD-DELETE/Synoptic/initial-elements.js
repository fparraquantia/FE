import React from 'react';
import { MarkerType, Position } from 'reactflow';
import denimwatertank from './denimwatertank.png'
import boiler from './boiler.png'
import sensor from './sensor.png'
import deaerator from './deaerator.png'
import heatexchanger from './heatexchanger.png'
import condensatetank from './condensatetank.png'
export const nodes = [
    {
        id: '1',
        type: 'input',
        data: {
            label: 'Denim Water Tank',
        },
        className: 'watertank',
        style: {
            background: `url(${denimwatertank})`, // Añade la imagen de fondo aquí
            height: '300px'
        },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '2',
        type: 'default node',
        data: {
            label: 'Make Up Sensor',
        },
        className: 'sensor',
        style: {
            background: `url(${sensor})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '80px'

        },
        position: { x: 200, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '3',
        type: 'default node',
        data: {
            label: 'Deaerator',
        },
        className: 'watertank',
        style: {
            background: `url(${deaerator})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '140px'
        },
        position: { x: 400, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '4',
        type: 'default node',
        data: {
            label: 'Condensate Tank',
        },
        className: 'watertank',
        style: {
            background: `url(${condensatetank})`, // Añade la imagen de fondo aquí
            backgroundSize: 'cover', // Asegura que la imagen cubra todo el nodo
            color: 'black',
        },
        position: { x: 600, y: -200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '5',
        type: 'default node',
        data: {
            label: 'Condensate Return Sensor',
        },
        className: 'sensor',
        style: {
            background: `url(${sensor})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '80px'
        },
        position: { x: 800, y: -200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '6',
        type: 'default node',
        data: {
            label: 'Heat Exchanger',
        },
        className: 'watertank',
        style: {
            background: `url(${heatexchanger})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '200px',
            height: '60px'
        },
        position: { x: 1000, y: -200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '7',
        type: 'default node',
        data: {
            label: 'Steam Sensor',
        },
        className: 'sensor',
        style: {
            background: `url(${sensor})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '80px'
        },
        position: { x: 1200, y: -200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '8',
        type: 'default node',
        data: {
            label: 'Feedwater Sensor',
        },
        className: 'sensor',
        style: {
            background: `url(${sensor})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '80px'
        },
        position: { x: 800, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '9',
        type: 'output',
        data: {
            label: 'Steam Loss Sensor',
        },
        className: 'sensor',
        style: {
            background: `url(${sensor})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '80px'
        },
        position: { x: 1400, y: -200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '10',
        type: 'default node',
        data: {
            label: 'Boiler',
        },
        className: 'watertank',
        style: {
            background: `url(${boiler})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '140px'
        },
        position: { x: 1200, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '11',
        type: 'output',
        data: {
            label: 'Blowdown Sensor',
        },
        className: 'sensor',
        style: {
            background: `url(${sensor})`, // Añade la imagen de fondo aquí
            backgroundSize: 'contain',
            withd: '100px',
            height: '80px'
        },
        position: { x: 1400, y: 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },

];

export const edges = [
    {
        id: 'e1-2', source: '1', target: '2', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#0000ff', strokeWidth: 5 }
    },
    {
        id: 'e2-3', source: '2', target: '3', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#0000ff', strokeWidth: 5 }
    },
    {
        id: 'e3-4', source: '3', target: '4', markerStart: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#0000ff', strokeWidth: 5 }
    },
    {
        id: 'e3-8', source: '3', target: '8', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#ff0000', strokeWidth: 5 }
    },
    {
        id: 'e4-5', source: '4', target: '5', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#FFFF00', strokeWidth: 5 }
    },
    {
        id: 'e5-6', source: '5', target: '6', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#FFFF00', strokeWidth: 5 }
    },
    {
        id: 'e6-7', source: '6', target: '7', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#FFB6C1', strokeWidth: 5 }
    },
    {
        id: 'e7-9', source: '7', target: '9', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#FFB6C1', strokeWidth: 5 }
    },
    {
        id: 'e7-10', source: '7', target: '10', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#FFB6C1', strokeWidth: 5 }
    },
    {
        id: 'e8-10', source: '8', target: '10', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#ff0000', strokeWidth: 5 }
    },
    {
        id: 'e10-11', source: '10', target: '11', markerEnd: {
            type: MarkerType.ArrowClosed,
        }, style: { stroke: '#ff0000', strokeWidth: 5 }
    },
    // {
    //     id: 'e4-5',
    //     source: '4',
    //     target: '5',
    //     type: 'smoothstep',
    //     sourceHandle: 'handle-0',
    //     data: {
    //         selectIndex: 0,
    //     },
    //     markerEnd: {
    //         type: MarkerType.ArrowClosed,
    //     },
    // },
    // {
    //     id: 'e4-6',
    //     source: '4',
    //     target: '6',
    //     type: 'smoothstep',
    //     sourceHandle: 'handle-1',
    //     data: {
    //         selectIndex: 1,
    //     },
    //     markerEnd: {
    //         type: MarkerType.ArrowClosed,
    //     },
    // },
];
