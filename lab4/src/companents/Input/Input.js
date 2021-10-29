import React, {useEffect, useState} from "react";
import {Paper} from "@material-ui/core";

import './Input.css'

export default function Input(props) {
    const {
        size,
        input,
        setInput
    } = props

    const [indexArr, setIndexArr] = useState([])
    useEffect(() => {
        const tmpIndexArr = []
        const tmpInput = []

        for (let i = 0; i < size; i++) {
            tmpIndexArr.push(i)
            const tmpInputRow = []
            for (let j = 0; j < size; j++)
                tmpInputRow.push(0)
            tmpInput.push(tmpInputRow)
        }

        setIndexArr(tmpIndexArr)
        setInput(tmpInput)
    }, [size])

    const getCellColor = (i, j) => input[i][j] ? 'black' : 'white';
    const handleClickCell = (i, j) => {
        const copyInput = input.map(row => [...row])
        copyInput[i][j] = copyInput[i][j] ? 0 : 1
        setInput(copyInput)
    }

    return (
        <Paper className={"InputContainer"}>
            <table className={"Input"}>
                <tbody>
                {indexArr.map((indexI) => {
                    return (
                        <tr>
                            {indexArr.map((_, indexJ) =>
                                <th
                                    className={"InputCell"}
                                    style={{backgroundColor: getCellColor(indexI, indexJ)}}
                                    onClick={() => handleClickCell(indexI, indexJ)}
                                />
                            )}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Paper>
    )
}