import React, {useEffect, useState} from "react";

import './MainBoard.css'
import {Button, Grid} from "@material-ui/core";
import ExternSolution from "../ExtendSolution/ExtendSolution";
import Graphic from "../Graphic/Graphic";

import RequestForm from "../RequestForm/RequestForm";

export default function MainBoard() {

    const [solution, setSolution] = useState([])
    const [graphicSeries, setGraphicSeries] = useState([])

    const [isFormOpen, setIsFormOpen] = useState(true)

    return (
        <React.Fragment>
            <RequestForm
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                setSolution={setSolution}
                setGraphicSeries={setGraphicSeries}
            >
            </RequestForm>
            <Grid container className={"MainBoard"}>
                <Grid item xs={6}>
                    <ExternSolution
                        solution={solution}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Graphic
                        graphicSeries={graphicSeries}
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    style={{margin: "auto", marginTop: "20px"}}
                    onClick={() => setIsFormOpen(true)}
                >
                    {"Настройки"}
                </Button>
            </Grid>
        </React.Fragment>
    )
}