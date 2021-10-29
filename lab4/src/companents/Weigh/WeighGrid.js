import React from "react";
import {Button, Fade, Paper} from "@material-ui/core";

import './Weigh.css'

export default function WeighGrid(props){

    const {
        weighs,
        isOpen,
        setIsOpen
    } = props

    return (
        <Fade in={isOpen}>
            <Paper className={'WeighGrid'}>
                <table className={"WeighGridTable"}>
                    <tbody>
                    {weighs.map((row) => {
                        return (
                            <tr>
                                {row.map((weigh) =>
                                    <th
                                        className={"WeighCell"}
                                    >
                                        {weigh.toFixed(2)}
                                    </th>
                                )}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <Button variant="outlined" onClick={() => setIsOpen(false)}>Закрыть</Button>
            </Paper>
        </Fade>
    )
}