import React, {useCallback, useState} from "react";

import './Settings.css'

import {useForm, Controller} from "react-hook-form";
import {Button, Fade, FormLabel, Grid, TextField,} from "@material-ui/core";
import {Check} from "@material-ui/icons";

export default function Settings({isFormOpen, setIsFormOpen, setSettings}) {

    const onCloseClick = () => setIsFormOpen(false)

    const onSubmit = useCallback(async (data) => {
        setSettings(data)
    }, [setSettings]);


    const {handleSubmit, register, control} = useForm();

    const fields = [
        // {label: "Количество городов", name: "countCity"},
        // {label: "Количество муравьев на каждый город", name: "countAnts"},
        // {label: "α (относительная значимость пути)", name: "alfa"},
        // {label: "β (относительная значимость видимости)", name: "betta"},
        // {label: "r (коэффициент количества фермента, оставляемого муравьем)", name: "r"},
        // {label: "Q (количество фермента, оставляемого муравьем", name: "Q"},
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