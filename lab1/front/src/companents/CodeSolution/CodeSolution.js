import React from "react";

import './CodeSolution.css'

export default function CodeSolution({codedSolution}){

    return (
        <table className={"CodeSolution"}>
            <tr>{codedSolution.map((_, index) => <th className={"Cell"}>{index+1}</th>)}</tr>
            <tr>{codedSolution.map((item, _) => <td className={"Cell"}>{item+1}</td>)}</tr>
        </table>
    )
}