import React, {useCallback, useState} from "react";

import './Settings.css'

import {useForm, Controller} from "react-hook-form";
import {Button, Fade, FormLabel, Grid, TextField,} from "@material-ui/core";
import {Check} from "@material-ui/icons";
import learning from "../utils/learning";

export default function Settings(props) {

    const {
        isFormOpen,
        setIsFormOpen,

        ihw, setIhw, how, setHow,

        learnParams
    } = props

    const onCloseClick = () => setIsFormOpen(false)

    const onSubmit = useCallback(async (data) => {

        learning(ihw, setIhw, how, setHow, {
            ...learnParams,
            ...data
        })

    }, [ihw, how, setHow, setIhw]);


    const {handleSubmit, register, control} = useForm();

    const fields = [
        {label: "Скорость обучени", name: "speedOfLearning"},
        {label: "Количество эпох", name: "numberOfEpochs"},
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
                        <Button variant="contained" color="primary" type="submit" style={{marginLeft: "5px"}}>
                                Обучить<Check style={{marginLeft: "5px"}}/>
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Fade>

    )
}