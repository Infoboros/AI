import React, {useEffect, useState} from "react";

import './MainBoard.css'
import {Button, Grid} from "@material-ui/core";
import CodeSolution from "../CodeSolution/CodeSolution";
import ExternSolution from "../ExtendSolution/ExtendSolution";
import Graphic from "../Graphic/Graphic";

import RequestForm from "../RequestForm/RequestForm";

export default function MainBoard() {

    const [codedSolution, setCodedSolution] = useState([])
    const [graphicSeries, setGraphicSeries] = useState([])

    const [isFormOpen, setIsFormOpen] = useState(true)

    return (
        <React.Fragment>
            <RequestForm
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                setCodedSolution={setCodedSolution}
                setGraphicSeries={setGraphicSeries}
            >
            </RequestForm>
            <Grid container className={"MainBoard"}>
                <Grid item xs={12}>
                    <CodeSolution
                        codedSolution={codedSolution}
                    >

                    </CodeSolution>
                </Grid>
                <Grid item xs={6}>
                    <ExternSolution
                        codedSolution={codedSolution}
                    >

                    </ExternSolution>
                </Grid>
                <Grid item xs={6}>
                    <Graphic
                        graphicSeries={graphicSeries}
                    >

                    </Graphic>
                </Grid>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{margin: "auto", marginTop:"20px"}}
                    onClick={() => setIsFormOpen(true)}
                >
                    {"Настройки"}
                </Button>
            </Grid>
        </React.Fragment>
    )
}