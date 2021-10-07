import React, {useCallback, useState} from "react";

import './Settings.css'

import {useForm, Controller} from "react-hook-form";
import {Button, CircularProgress, Fade, FormLabel, Grid, TextField,} from "@material-ui/core";
import {PieChart} from "@material-ui/icons";

export default function Settings({isFormOpen, setIsFormOpen, setSettings}) {

    const onCloseClick = () => setIsFormOpen(false)

    const [isSubmitFormLoading, setIsSubmitFormLoading] = useState(false)
    const onSubmit = useCallback(async (data) => {

    }, [setSettings]);


    const {handleSubmit, register, control} = useForm();

    const fields = [
        {label: "Максимальное количество кластеров", name: "N", initial: 10},
        {label: "Параметр внимательности (0<p<=1)", name: "p", initial: 0.5},
        {label: "Бета-параметр (небольшое целое число)", name: "b", initial: 0.98},
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

                    <Grid item xs={12}>
                        <FormLabel>{"Векторы признаков"}</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            ref={register}
                            as={TextField}
                            fullWidth
                            name={"vectors"}
                            variant="outlined"
                            render={({field}) => <TextField {...field} multiline/>}
                        />
                    </Grid>

                    <Grid className={'Actions'} item xs={12}>
                        <Button variant="outlined" onClick={onCloseClick}>Закрыть</Button>
                        <Button variant="contained" color="secondary" type="submit" style={{marginLeft: "5px"}}>
                            {
                                isSubmitFormLoading
                                    ? <><CircularProgress color="inherit" size="1.2rem"/>&nbsp;Кластеризация...</>
                                    : <>Кластеризировать&nbsp;<PieChart/></>
                            }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Fade>

    )
}