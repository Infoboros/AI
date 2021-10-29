import React from "react";

import './Weigh.css'
import WeighContainer from "./WeighContainer";

export default function Weigh(props) {

    const {
        ihw,
        how
    } = props

    return (
        <div>
            <WeighContainer
                weighs={ihw}
                openText={"Посмотреть веса между входным и скрытым слоем"}
            />
            <WeighContainer
                weighs={how}
                openText={"Посмотреть веса между скрытым и выходным слоем"}
            />
        </div>
    )
}