import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';
import {remoteRoutes} from "../../../data/constants";
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";
import TextArea from "../../../widgets/inputs/TextArea";
import MultiSelectInput from "../../../widgets/inputs/MultiSelectInput";
import {toOptions} from "../../../utils/TK";
import {emailCategories} from "../../contacts/config";
import {serviceCategories} from "../config";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

interface IProps extends WithStyles<typeof styles> {
}

const LocationEditor = (props: IProps) => {
    return (
        <div style={{padding: 12}}>
            <Grid className={props.classes.root} container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <TextInput type='text' name='name' label='Name'/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextInput type='text' name='venue' label='Venue'/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <MultiSelectInput name='meetingTimes' label='Meeting Times' options={toOptions(serviceCategories)}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextArea type='text' name='details' label='Details'/>
                </Grid>
            </Grid>
        </div>
    )
}
export default withStyles(styles)(LocationEditor)
