import React, {useState} from "react";
import WeighGrid from "./WeighGrid";
import {Button, Paper} from "@material-ui/core";

import './Weigh.css'

export default function WeighContainer(props){
    const {
        weighs,
        openText
    } = props

    const [isOpen ,setIsOpen] = useState(false)

    return (
        <div className={'WeighGridContainer'}>
            <WeighGrid
                weighs={weighs}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <Button
                variant="contained"
                color="primary"
                style={{margin: "auto", marginTop: "20px", display: "flex"}}
                onClick={() => setIsOpen(true)}
            >
                {openText}
            </Button>

        </div>
    )
}