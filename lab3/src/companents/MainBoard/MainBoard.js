import React, {useState} from "react";

import './MainBoard.css'
import {Button, Grid} from "@material-ui/core";

import Settings from "../Settings/Settings";
import Map from "../Map/Map";
import {set} from "react-hook-form";

export default function MainBoard() {

    const [settings, setSettings] = useState({
        countCity: 5,
        countAnts: 10,
        alfa: 3,
        betta: 1,
        r: 0.5,
        Q: 1
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
                <Grid item xs={12}>
                    <Map
                        settings={settings}
                        setSettigs={setSettings}
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