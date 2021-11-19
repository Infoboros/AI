import React, {useEffect, useState} from "react";

import './MainBoard.css'
import {Button, Grid} from "@material-ui/core";

import Settings from "../Settings/Settings";
import Map from "../Map/Map";
import {set} from "react-hook-form";
import Solutions from "../Solutions/Solutions";

const maxDistance = 1000;
let bestDistance = 0
let bestPath = []

let map = [];
let distance = []
let neighbours = []

let parentPopulation = []
let childPopulation = []

let path = []
let dist = []

let prevCityes = 0

const data = {
    nodes: [],
    links: [],
};

const myConfig = {
    directed: false
};

export default function MainBoard() {

    const [settings, setSettings] = useState({
        chromosomes: 15,
        mutation: 0.5,
        maxGeneration: 5000,
        neighbours: 2,
        cities: 15,
    })

    const [isFormOpen, setIsFormOpen] = useState(false)

    const [graph, setGraph] = useState({nodes: [], links: []})
    const [isShowGraph, setIsShowGraph] = useState(false)

    const changeGraph = () => {
        let newLinks = data.links;
        const indexes = []
        for (let i = 0; i < bestPath.length - 1; i++) {
            newLinks.forEach((link, index) => {
                if ((Number(link.source) === bestPath[i] && Number(link.target) === bestPath[i + 1]) || (Number(link.target) === bestPath[i] && Number(link.source) === bestPath[i + 1])) {
                    indexes.push(index)
                }
            })
        }

        newLinks = newLinks.map((link) => ({
            source: link.source,
            target: link.target
        }))

        indexes.forEach((item) => {
            newLinks[item] = {
                source: newLinks[item].source,
                target: newLinks[item].target,
                color: 'red'
            }
        })

        data.links = newLinks

        setGraph(data)

        setIsShowGraph(true)
    }

    const getMap = (size) => {
        data.nodes = []
        data.links = []
        setGraph({nodes: [], links: []})

        map = []
        for (let i = 0; i < size; i++)
            map.push({
                x: Math.round(Math.random() * maxDistance),
                y: Math.round(Math.random() * maxDistance),
            })

        data.nodes = [];
        for (let i = 0; i < size; i++) {
            data.nodes.push({id: i.toString()});
        }

        data.links = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i !== j) {
                    data.links.push({
                        source: data.nodes[i].id,
                        target: data.nodes[j].id,
                    })
                }
            }
        }

        setGraph(data)
    }

    const initCities = () => {

        distance = []

        map = []

        for (let from = 0; from < settings.cities; from++) {

            distance.push([])

            map.push({
                x: Math.round(Math.random() * maxDistance),
                y: Math.round(Math.random() * maxDistance),
            })

            for (let to = 0; to < settings.cities; to++) {
                distance[from].push(0.0)
            }
        }


        for (let from = 0; from < settings.cities; from++) {
            for (let to = 0; to < settings.cities; to++) {
                if (to !== from && distance[from][to] === 0.0) {
                    const xd = Math.abs(map[from].x - map[to].x)
                    const yd = Math.abs(map[from].y - map[to].y)

                    distance[from][to] = Math.sqrt((xd * xd) + (yd * yd))
                    distance[to][from] = distance[from][to]
                }
            }
        }
    }

    const initNeighbours = () => {
        let neighbourIndex = 0
        let neighbourDistance = maxDistance * 10

        for (let i = 0; i < settings.cities; i++) {
            neighbours.push([])

            for (let j = 0; j < settings.neighbours; j++) {
                neighbours[i].push(0)
            }
        }

        for (let i = 0; i < settings.cities; i++) {
            const cityDistances = [...distance[i]]

            for (let j = 0; j < settings.neighbours; j++) {
                for (let k = 0; k < settings.cities; k++) {
                    if (cityDistances[k] < neighbourDistance && k != i) {
                        neighbourDistance = cityDistances[k]
                        neighbourIndex = k
                    }
                }

                neighbours[i][j] = neighbourIndex
                neighbourDistance = maxDistance * 10
                cityDistances[neighbourIndex] = neighbourDistance
                neighbourIndex = 0
            }
        }
    }

    const initChromosomes = () => {

        const tempPath = []
        for (let i = 0; i < settings.cities; i++) {
            tempPath.push(0)
        }

        parentPopulation = []
        childPopulation = []
        for (let i = 0; i < settings.chromosomes; i++) {
            parentPopulation.push({
                health: 0,
                path: [...tempPath]
            })
            childPopulation.push({
                health: 0,
                path: [...tempPath]
            })
        }

        for (let i = 0; i < settings.chromosomes; i++) {

            const newChromosome = {
                health: 0,
                path: [...tempPath]
            }

            const newPath = [...tempPath]

            const unselectedCities = []
            for (let j = 0; j < settings.cities; j++) {
                unselectedCities.push(j)
            }

            let startIndex = Math.round(Math.random() * (settings.cities - 1))
            newPath[0] = startIndex

            unselectedCities.splice(unselectedCities.findIndex(index => index === startIndex), 1)

            for (let j = 1; j < settings.cities; j++) {
                let wasNeighbourSelected = false

                const possibleNeighbours = []
                for (let k = 0; k < settings.neighbours; k++) {
                    possibleNeighbours.push(neighbours[newPath[j - 1]][k])
                }

                for (let k = 0; k < settings.neighbours; k++) {

                    const randomNeighbour = possibleNeighbours[Math.round(Math.random() * (possibleNeighbours.length - 1))]

                    if (unselectedCities.find(cityIndex => cityIndex === randomNeighbour) !== undefined) {
                        newPath[j] = randomNeighbour
                        unselectedCities.splice(unselectedCities.findIndex(cityIndex => cityIndex === randomNeighbour), 1)
                        wasNeighbourSelected = true
                        break
                    }
                }

                if (!wasNeighbourSelected) {
                    const randomCity = unselectedCities[Math.round(Math.random() * (unselectedCities.length - 1))]
                    newPath[j] = randomCity
                    unselectedCities.splice(unselectedCities.findIndex(cityIndex => cityIndex === randomCity), 1)
                }
            }

            newChromosome.path = [...newPath]

            parentPopulation[i] = {...newChromosome}

            childPopulation[i] = {
                health: 0,
                path: [...tempPath]
            }
        }
    }

    const init = () => {
        setIsShowGraph(false)

        path = []
        dist = []

        bestDistance = settings.cities * maxDistance * 10

        bestPath = []

        initCities()

        initNeighbours()

        initChromosomes()
    }

    useEffect(() => {
        if (settings.cities !== Number(prevCityes)){
            prevCityes = settings.cities
            getMap(settings.cities)
        }
    }, [settings]);

    const calculatePathLength = (path) => {
        let sum = 0

        for (let i = 0; i < path.length - 1; i++) {
            sum += distance[path[i]][path[i + 1]]
        }

        sum += distance[path[path.length - 1]][path[0]]
        return sum
    }


    const makeRating = () => {

        for (let i = 0; i < parentPopulation.length; i++) {

            parentPopulation[i].health = calculatePathLength(parentPopulation[i].path)

            if (parentPopulation[i].health < bestDistance) {

                bestDistance = parentPopulation[i].health
                bestPath = [...parentPopulation[i].path]

                path.push(bestPath)
                dist.push(bestDistance)
            }
        }
    }

    const sortPopulation = (population) => {

        const resultPopulation = []
        for (let i = 0; i < population.length; i++) {
            resultPopulation.push({...population[i]})
        }

        for (let i = 0; i < resultPopulation.length; i++) {
            let min = resultPopulation[i].health
            let min_i = i

            for (let j = i + 1; j < resultPopulation.length; j++) {
                if (resultPopulation[j].health < min) {
                    min = resultPopulation[j].health
                    min_i = j
                }
            }

            if (i !== min_i) {
                const tmp = {...resultPopulation[i]}
                resultPopulation[i] = {...resultPopulation[min_i]}
                resultPopulation[min_i] = {...tmp}
            }
        }

        return resultPopulation
    }

    const cross = (c1, c2) => {

        let pathLength = c1.path.length
        const tempPath = []
        for (let i = 0; i < pathLength; i++) {
            tempPath.push(0)
        }

        const resultChromosomes = [
            {
                health: 0,
                path: [...tempPath],
            },
            {
                health: 0,
                path: [...tempPath]
            }
        ]


        let splitPos = Math.round(Math.random() * (pathLength - 1))

        const childFirst = []
        const childSecond = []

        for (let i = 0; i <= splitPos; i++) {
            childFirst.push(c1.path[i])
            childSecond.push(c2.path[i])
        }

        for (let i = 0; i < pathLength; i++) {
            if (childFirst.findIndex(index => index === c2.path[i]) === -1) {
                childFirst.push(c2.path[i])
            }
            if (childSecond.findIndex(index => index === c1.path[i]) === -1) {
                childSecond.push(c1.path[i])
            }
        }

        for (let i = 0; i < pathLength; i++) {
            resultChromosomes[0].path[i] = childFirst[i]
            resultChromosomes[1].path[i] = childSecond[i]
        }

        return resultChromosomes
    }

    const mutate = (c) => {

        let pathLength = c.path.length
        const tempPath = []
        for (let i = 0; i < pathLength; i++) {
            tempPath.push(0)
        }

        const resultChromosome = {
            health: 0,
            path: [...tempPath]
        }

        for (let i = 0; i < pathLength; i++) {
            resultChromosome.path[i] = c.path[i]
        }

        let pos1 = Math.round(Math.random() * (pathLength - 1))
        let pos2 = pos1

        do {
            pos2 = Math.round(Math.random() * (pathLength - 1))
        } while (pos1 === pos2)

        const temp = resultChromosome.path[pos1]
        resultChromosome.path[pos1] = resultChromosome.path[pos2]
        resultChromosome.path[pos2] = temp

        return resultChromosome
    }

    const recombination = (parentIndex1, parentIndex2, childIndex1, childIndex2) => {

        const resultChromosomes = cross(parentPopulation[parentIndex1], parentPopulation[parentIndex2])

        if (Math.random() < settings.mutation) {
            resultChromosomes[0] = mutate(resultChromosomes[0])
        }

        if (Math.random() < settings.mutation) {
            resultChromosomes[1] = mutate(resultChromosomes[1])
        }

        childPopulation[childIndex1] = {...resultChromosomes[0]}
        childPopulation[childIndex2] = {...resultChromosomes[1]}
    }

    const makeSelection = () => {

        parentPopulation = sortPopulation(parentPopulation)

        childPopulation = [...parentPopulation]

        recombination(0, 1, settings.chromosomes - 1, settings.chromosomes - 2)
    }

    const handleSearch = () => {

        init()

        for (let i = 0; i < settings.maxGeneration; i++) {

            makeRating()

            makeSelection()

            parentPopulation = [...childPopulation]
        }

        changeGraph()
    }

    return (
        <React.Fragment>
            <Settings
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                setSettings={setSettings}
            >
            </Settings>
            <Grid container className={"MainBoard"}>
                <Grid item xs={6}>
                    <Map
                        data={data}
                        isShowGraph={isShowGraph}
                        graph={graph}
                        myConfig={myConfig}
                        handleSearch={handleSearch}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Solutions
                        paths={path}
                        dists={dist}
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{margin: "auto", marginTop: "20px"}}
                    onClick={() => setIsFormOpen(true)}
                >
                    {"Настройки"}
                </Button>
            </Grid>
        </React.Fragment>
    )
}