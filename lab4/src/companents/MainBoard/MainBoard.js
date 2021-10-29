import React, {useEffect, useState} from "react";

import './MainBoard.css'
import {Button, Grid} from "@material-ui/core";

import Settings from "../Settings/Settings";
import Input from "../Input/Input";
import Weigh from "../Weigh/Weigh";
import Result from "../Result/Result";

export default function MainBoard() {

    const inputSize = 8;
    const [input, setInput] = useState([])

    const hiddenSize = 5;
    const [ihw, setIhw] = useState([])
    const [how, setHow] = useState([])

    const outputSize = 5;


    useEffect(() => {
        const tmpIhw = []
        for (let i = 0; i < inputSize*inputSize; i++) {
            const rowTmpIhw = []
            for (let j = 0; j < hiddenSize; j++) {
                rowTmpIhw.push(Math.random() - 0.5)
            }
            tmpIhw.push(rowTmpIhw)
        }
        setIhw(tmpIhw)

        const tmpHow = []
        for (let i = 0; i < hiddenSize; i++) {
            const rowTmpHow = []
            for (let j = 0; j < outputSize; j++) {
                rowTmpHow.push(Math.random() - 0.5)
            }
            tmpHow.push(rowTmpHow)
        }
        setHow(tmpHow)
    }, [inputSize, hiddenSize])


    const [output, setOutput] = useState([])
    useEffect(() => {

        const tmpOutput = []
        for (let i = 0; i < outputSize; i++)
            tmpOutput.push(0)

        //TODO убрать
        tmpOutput[1] = 1
        tmpOutput[3] = 1

        setOutput(tmpOutput)

    }, [outputSize])

    const [settings, setSettings] = useState({
    })

    const [isFormOpen, setIsFormOpen] = useState(false)

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
                    <Input
                        size={inputSize}
                        input={input}
                        setInput={setInput}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Weigh
                        ihw={ihw}
                        how={how}
                    />
                    <Result
                        result={output}
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    style={{margin: "auto", marginTop: "20px", display: "flex"}}
                    onClick={() => setIsFormOpen(true)}
                >
                    {"Обучение"}
                </Button>
            </Grid>
        </React.Fragment>
    )
}