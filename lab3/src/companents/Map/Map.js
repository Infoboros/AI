import React, {useEffect, useState} from "react";
import {Paper} from "@material-ui/core";
import {Graph} from 'react-d3-graph'


export default function Map({settings}) {

    const [graph, setGraph] = useState({
        nodes: [
            {id: 'Harry', x: 0, y: 0},
            {id: 'Sally', x: 0, y: 0},
            {id: 'Alice'}
        ],
        links: [
            {source: 'Harry', target: 'Sally'},
            {source: 'Harry', target: 'Alice'},
        ]
    })

    useEffect(() => {
        const {countCity} = settings
        const nodes = []

        for (let i = 0; i < countCity; i++)
            nodes.push({
                id: i.toString(),
                x: i * 100,
                y: (i % 2) * 100
            })

        const links = []
        nodes.map(node1 => {
            nodes
                .filter(node => node.id !== node1.id)
                .map(node2 => {
                    links.push({source: node1.id, target: node2.id})
                })
        })

        setGraph({
            nodes: nodes,
            links: links
        })
    }, [settings])

    const config = {
        height: 650,
        width: 1300,
        directed: false,
        d3: {
            disableLinkForce: true,
            gravity: -500
        },
    };

    const onNodePositionChange = (nodeId, x, y) => {
        console.log(nodeId, x, y)
    }

    return (
        <Paper>
            <Graph
                id="graph"
                data={graph}
                config={config}
                onNodePositionChange={onNodePositionChange}
            />
        </Paper>
    )

}