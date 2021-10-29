import React, {useEffect, useState} from "react";
import {Button, Grid, Paper} from "@material-ui/core";
import {Graph} from 'react-d3-graph'
import {Check} from "@material-ui/icons";

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}

export default function Map({settings, setSettigs}) {

    const [graph, setGraph] = useState({})
    const [bestPath, setBestPath] = useState([])
    const [bestLenght, setBestLenght] = useState([])

    let bestPaths = []
    let bestLenghts = []

    let ants = []

    useEffect(() => {
        const {countCity} = settings
        const nodes = []

        for (let i = 0; i < countCity; i++)
            nodes.push({
                id: i,
                x: i * 100 + 100,
                y: (i % 2) * 100 + 100,
                color: "#000000"
            })

        const links = []
        nodes.map(node1 => {
            nodes
                .filter(node => node.id !== node1.id)
                .map(node2 => {
                    links.push({
                        source: node1.id,
                        target: node2.id,
                        pheromone: 1 / nodes.length,
                        color: "#000000"
                    })
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
        const {nodes, links} = graph;

        setGraph({
            nodes: [
                ...(nodes.filter(node => node.id !== nodeId)),
                {
                    id: nodeId,
                    x, y
                }
            ],
            links
        })
    }

    const initAnts = () => {
        const {countCity, countAnts} = settings

        ants = []

        for (let i = 0; i < countCity; i++) {
            for (let j = 0; j < countAnts; j++) {
                ants.push({
                    path: [i],
                    pathLength: 0
                })
            }
        }
    }

    const handleReset = () => {
        initAnts()

        const {nodes, links} = graph
        setGraph({
            nodes: nodes.map(node => {
                return {
                    ...node,
                    color: "#000000"
                }
            }),
            links: links.map(link => {
                return {
                    ...link,
                    color: "#000000",
                    pheromone: 1 / nodes.length
                }
            })
        })
    }

    const selectNextCity = (ant, prevCity) => {
        let nextCity;
        let denom = 0;

        const {countCity, alfa, betta} = settings
        const {links} = graph

        for (nextCity = 0; nextCity < countCity; nextCity++) {
            if (!ant.path.includes(nextCity)) {
                const link = links.find(link => (link.source === prevCity) && (link.target === nextCity))
                denom += Math.pow(link.pheromone, alfa) *
                    Math.pow((1 / getDistance(prevCity, nextCity)), betta);
            }
        }


        const nextCityes = []
        for (nextCity = 0; nextCity < countCity; nextCity++) {
            if (!ant.path.includes(nextCity)) {
                const link = links.find(link => (link.source === prevCity) && (link.target === nextCity))
                const p = Math.pow(link.pheromone, alfa) *
                    Math.pow((1.0 / getDistance(prevCity, nextCity)), betta) / denom;

                nextCityes.push({
                    city: nextCity,
                    p
                })
            }
        }

        const random = Math.random()
        let randomS = nextCityes[0].p
        for (let i = 0; i < nextCityes.length; i++) {
            if (random < randomS)
                return nextCityes[i].city
            else
                randomS += nextCityes[i + 1].p
        }

        return nextCity;
    }

    const getDistance = (prevCity, nextCity) => {
        const {nodes} = graph

        const prevNode = nodes.find(node => node.id === prevCity)
        const nextNode = nodes.find(node => node.id === nextCity)


        const xd = Math.abs(prevNode.x - nextNode.x);
        const yd = Math.abs(prevNode.y - nextNode.y);
        return Math.sqrt(((xd * xd) + (yd * yd)));
    }

    const simulateAnts = () => {
        let moving = 0

        const {countCity} = settings

        for (let antI = 0; antI < ants.length; antI++) {
            const prevCity = ants[antI].path[ants[antI].path.length - 1]

            if (ants[antI].path.length >= countCity) {
                if (ants[antI].path.length === countCity) {
                    ants[antI].pathLength += getDistance(prevCity, ants[antI].path[0])
                    ants[antI].path.push(ants[antI].path[0])
                    moving++;
                }
                continue
            }

            const nextCity = selectNextCity(ants[antI], prevCity)

            ants[antI].path.push(nextCity)
            ants[antI].pathLength += getDistance(prevCity, nextCity)
            moving++;
        }

        return moving
    }

    const updatePheromone = () => {

        const {r, countCity, Q} = settings

        let newLinks = graph.links
            .map(link => {
                let newPheromone = link.pheromone * (1 - r)
                if (newPheromone < 0)
                    newPheromone = 0

                return {
                    ...link,
                    pheromone: newPheromone
                }
            })

        for (let ant = 0; ant < ants.length; ant++) {
            for (let i = 0; i < countCity; i++) {

                const prevCity = ants[ant].path[i]
                const nextCity = ants[ant].path[i + 1]

                let D = (Q / ants[ant].pathLength);

                newLinks = newLinks.map(link => {
                    const {source, target} = link

                    let newLink = {
                        ...link
                    }

                    if (
                        ((source === prevCity) && (target === nextCity))
                    )
                        newLink.pheromone = D + link.pheromone * r
                    return newLink
                })

            }
        }

        let newNodes = graph.nodes
            .map(node => {
                return {
                    ...node,
                    color: "#000000"
                }
            })

        newLinks = newLinks
            .sort((l1, l2) => l2.pheromone - l1.pheromone)
            .map(link => {
                return {
                    ...link,
                    color: "#000000"
                }
            })

        let filteredLink = newLinks.reduce((result, link) => {
            if (!(result.find(rlink => rlink === link) || result.find(rlink => (rlink.source === link.target) && (rlink.target === link.source))))
                return result.concat([link])
            return result
        }, [])

        for (let i = 0; i < countCity; i++) {
            const link = filteredLink[i]
            link.color = "#ff0000"

            const reLink = newLinks.find(rlink => (rlink.source === link.target) && (rlink.target === link.source))
            reLink.color = "#ff0000"
        }

        setGraph({
            nodes: newNodes,
            links: newLinks
        })
    }

    const updateBest = () => {
        ants = ants.sort((a1, a2) => a2.pathLength - a1.pathLength)
        const bestAnt = ants[0]
        bestPaths.push(bestAnt.path)
        bestLenghts.push(bestAnt.pathLength)
    }

    const handleIteration = () => {
        for (let i = 0; i < 50; i++) {
            initAnts()
            while (simulateAnts()) {
            }
            sleep(10)
            updateBest()
            updatePheromone()
        }

        setBestPath(bestPaths)
        setBestLenght(bestLenghts)
    }

    return (
        <Paper>
            <Graph
                id="graph"
                data={graph}
                config={config}
                onNodePositionChange={onNodePositionChange}
            />
            <Grid item xs={12}>
                <Button variant="outlined" onClick={handleReset} style={{marginBottom: "20px"}}>
                    Перезапуск
                </Button>
                <Button variant="contained" onClick={handleIteration} color="secondary"
                        style={{marginLeft: "5px", marginBottom: "20px"}}>
                    Старт Итерации
                </Button>
            </Grid>
            <Grid item xs={12}>
                {bestPath.map((path, i) => {
                    return (
                        <>
                            {`[${path.join('->')}]`}
                            <br/>
                            {`Path Lenght: ${bestLenght[i]}`}
                            <br/>
                        </>
                    )
                })}

            </Grid>
        </Paper>
    )

}