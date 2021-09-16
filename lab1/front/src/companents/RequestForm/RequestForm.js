import React, {useCallback, useEffect, useState} from "react";

import './RequestForm.css'

import {useForm, Controller} from "react-hook-form";
import {Button, CircularProgress, Fade, FormLabel, Grid, TextField,} from "@material-ui/core";
import {Fireplace} from "@material-ui/icons";
import getSolution from "../../api";

export default function RequestForm({isFormOpen, setIsFormOpen, setCodedSolution, setGraphicSeries}) {

    const onCloseClick = () => setIsFormOpen(false)

    const [isSubmitFormLoading, setIsSubmitFormLoading] = useState(false)
    const onSubmit = useCallback(async (data) => {
        setIsSubmitFormLoading(true);
        getSolution(data)
            .then(({solution, graphics}) => {
                setCodedSolution(solution)
                setGraphicSeries(graphics)
            })
            .finally(() => setIsSubmitFormLoading(false)
            )

    }, [setCodedSolution, setGraphicSeries]);


    const {handleSubmit, register, control, errors, reset, setError} = useForm();

    const fields = [
        {label: "Максимальная температура", name: "initialTemperature", initial: 30.0},
        {label: "Минимальная температура", name: "finalTemperature", initial: 0.5},
        {label: "Коэффициент понижения температуры", name: "alfaForTemperature", initial: 0.98},
        {label: "Количество ферзей.", name: "countFigures", initial: 8},
        {label: "Количество шагов при постоянном значении температуры. ", name: "stepsPerChange", initial: 100}
    ]

    return (
        <Fade in={isFormOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className={"RequestForm"}>
                <Grid container spacing={2}>
                    {fields.map(field => {
                        return (
                            <React.Fragment>
                                <Grid item xs={6}>
                                    <FormLabel>{field.label}</FormLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        control={control}
                                        ref={register}
                                        as={TextField}
                                        fullWidth
                                        name={field.name}
                                        variant="outlined"
                                        render={({field}) => <TextField {...field} defaultValue={field.initial}/>}
                                    />
                                </Grid>
                            </React.Fragment>
                        )
                    })}


                    <Grid className={'Actions'} item xs={12}>
                        <Button variant="outlined" onClick={onCloseClick}>Закрыть</Button>
                        <Button variant="contained" color="secondary" type="submit" style={{marginLeft: "5px"}}>
                            {
                                isSubmitFormLoading
                                    ? <><CircularProgress color="inherit" size="1.2rem"/>&nbsp;Отжиг...</>
                                    : <>Отжечь&nbsp;<Fireplace/></>
                            }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Fade>

    )
}