import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';
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

const NewTeamEditor = (props: IProps) => {
    return (
        <div style={{padding: 12}}>
            <Grid className={props.classes.root} container spacing={24}>
                <Grid item xs={12} sm={12}>

                    <TextInput type='text' name='name' label='Name'/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextInput type='text' name='description' label='Description'/>
                </Grid>
            </Grid>
        </div>

    )
}


export default withStyles(styles)(NewTeamEditor)
