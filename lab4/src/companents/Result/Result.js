import React from "react";
import {Paper} from "@material-ui/core";

import './Result.css'

export default function Result(props) {

    const {
        result
    } = props

    const resultName = [
        'Овощ1',
        'Овощ2',
        'Овощ3',
        'Овощ4',
        'Овощ5',
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
                                {value}
                            </th>
                        )
                    })}
                    </tbody>
                </table>
            </Paper>
            {result.map((value, index) => {
                if (!value)
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