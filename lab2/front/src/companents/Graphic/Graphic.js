import React, {useEffect, useState} from "react";

import './Graphic.css'
import Chart from "@toast-ui/chart/dist/esm";

export default function Graphic({graphicSeries}){

    const [data, setData] = useState({
        series: []
    })
    useEffect(() => {
        setData({
            series: graphicSeries
        })
    }, [graphicSeries])

    const options = {
        chart: { width: 700, height: 400 },
    };

    useEffect(() => {
        const el = document.getElementById('chart');
        while (el.childElementCount)
            el.removeChild(el.firstChild)
        Chart.pieChart({ el, data, options });
    }, [data])


    return (
        <div id="chart"></div>
    )
}