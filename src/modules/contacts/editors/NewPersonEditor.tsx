import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';

import DateInput from '../../../widgets/inputs/DateInput';
import TextInput from '../../../widgets/inputs/TextInput';
import SelectInput from '../../../widgets/inputs/SelectInput';
import {civilStatus, gender, salutation} from "../config";
import {toOptions} from "../../../utils/TK";
import {remoteRoutes} from "../../../data/constants";
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

interface IProps extends WithStyles<typeof styles> {
}


const NewPersonEditor = (props: IProps) => {
    const parser = (it: any) => ({label: it.name, value: it.id})
    return (
        <div style={{padding: 12}}>
            <Grid className={props.classes.root} container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                    <XRemoteSelect
                        name='churchLocation' label='Church Location'
                        remote={remoteRoutes.locations}
                        parser={parser}
                        isMulti={false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <XRemoteSelect
                        name='cellGroup' label='Missional Community'
                        remote={remoteRoutes.cellGroups}
                        parser={parser}
                        isMulti={false}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SelectInput name='salutation' label='Salutation' options={toOptions(salutation)}/>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextInput type='text' name='lastName' label='Surname'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInput type='text' name='firstName' label='First Name'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInput type='text' name='middleName' label='Middle Name'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DateInput name='dateOfBirth' label='Birthday'/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SelectInput name='gender' label='Gender' options={toOptions(gender)}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SelectInput name='civilStatus' label='Civil Status' options={toOptions(civilStatus)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInput type="text" name='email' label='Email'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInput type="text" name='phone' label='Phone'/>
                </Grid>
            </Grid>
        </div>

    )
}


export default withStyles(styles)(NewPersonEditor)
