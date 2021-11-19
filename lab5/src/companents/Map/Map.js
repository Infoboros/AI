import React, {useEffect, useState} from "react";
import {Button, Grid, Paper} from "@material-ui/core";
import {Graph} from 'react-d3-graph'
import {Check} from "@material-ui/icons";


export default function Map({data, isShowGraph, graph, myConfig, handleSearch}) {



    return (
        <Paper>
            {data.nodes.length > 2 && (isShowGraph ? <Graph
                id="graph" // id is mandatory, if no id is defined rd3g will throw an error
                data={graph}
                config={myConfig}
            /> : <Graph
                id="graph" // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
            />)}
            <Grid item xs={12}>
                <Button variant="outlined" onClick={handleSearch} style={{marginBottom: "20px"}}>
                    Поиск
                </Button>
            </Grid>
        </Paper>
    )

}