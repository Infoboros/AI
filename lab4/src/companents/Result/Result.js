import React from "react";
import {Paper} from "@material-ui/core";

import './Result.css'

export default function Result(props) {

    const {
        result
    } = props

    const resultName = [
        'Яблоко',
        'Ананас',
        'Карамболы',
        'Банан',
    ]

    return (
        <React.Fragment>
            <Paper className={"ResultContainer"}>
                <table className={"ResultTable"}>
                    <tbody>
                    {result.map((value) => {
                        return (
                            <th
                                className={"ResultCell"}
                            >
                                {value.toFixed(2)}
                            </th>
                        )
                    })}
                    </tbody>
                </table>
            </Paper>
            {result.map((value, index) => {
                if ((!value) || value < 0.90)
                    return null

                return (
                    <div className={"ResultName"}>
                        {resultName[index]}
                    </div>
                )
            })}
        </React.Fragment>
    )
}