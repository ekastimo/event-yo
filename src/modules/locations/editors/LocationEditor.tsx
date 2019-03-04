import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';
import TextArea from "../../../widgets/inputs/TextArea";
import MultiSelectInput from "../../../widgets/inputs/MultiSelectInput";
import {toOptions} from "../../../utils/TK";
import {serviceCategories} from "../config";

const LocationEditor = () => {
    return (
        <div style={{padding: 12}}>
            <Grid  container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                    <TextInput type='text' name='id' label='Unique Name'/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextInput type='text' name='name' label='Simpler Name'/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextInput type='text' name='venue' label='Venue'/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <MultiSelectInput name='meetingTimes' label='Meeting Times' options={toOptions(serviceCategories)}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextArea type='text' name='details' label='Details'/>
                </Grid>
            </Grid>
        </div>
    )
}
export default LocationEditor
