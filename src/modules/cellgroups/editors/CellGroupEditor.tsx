import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';
import {toOptions} from "../../../utils/TK";
import TextArea from "../../../widgets/inputs/TextArea";
import MultiSelectInput from "../../../widgets/inputs/MultiSelectInput";
import {cellGroupServiceCategories} from "../config";
import {remoteRoutes} from "../../../data/constants";
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";

const CellGroupEditor = () => {
    const parser = (it: any) => ({label: it.name, value: it.id})
    return (
        <div style={{padding: 12}}>
            <Grid  container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                    <XRemoteSelect
                        name='location' label='Church Location'
                        remote={remoteRoutes.locations}
                        parser={parser}
                        isMulti={false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextInput type='text' name='name' label='Name'/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextInput type='text' name='venue' label='Venue'/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <MultiSelectInput name='meetingTimes' label='Meeting Times' options={toOptions(cellGroupServiceCategories)}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextArea type='text' name='details' label='Details'/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CellGroupEditor
