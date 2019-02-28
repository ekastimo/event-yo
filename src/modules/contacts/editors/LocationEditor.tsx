import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import DateInput from '../../../widgets/inputs/DateInput';
import TextInput from '../../../widgets/inputs/TextInput';
import SelectInput from '../../../widgets/inputs/SelectInput';
import {civilStatus, gender, salutation} from "../config";
import {toOptions} from "../../../utils/TK";
import TextArea from "../../../widgets/inputs/TextArea";

interface IProps  {
}

const PersonEditor = (props: IProps) => {
    return (
        <div style={{padding: 12}}>
            <Grid  container spacing={24} >
                <Grid item xs={12} sm={3} >
                    <SelectInput name='salutation' label='Salutation' options={toOptions(salutation)} />
                </Grid>
                <Grid item xs={12} sm={9} >
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
                <Grid item xs={12} sm={12}>
                    <TextArea type='textarea' name='about' label='About'/>
                </Grid>
            </Grid>
        </div>

    )
}

export default PersonEditor
