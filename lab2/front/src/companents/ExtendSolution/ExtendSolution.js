import React from "react";

import './ExtendSolution.css'

export default function ExternSolution({solution}) {

    return (
        <div>{
            solution.map(({prototype, vectors}) => {
                return <p>{prototype}{"->"}{vectors}</p>
            })
        }</div>
    )
}