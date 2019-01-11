import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

interface IProps extends WithStyles<typeof styles> {
}

const MemberEditor = (props: IProps) => {
    return (
        <div style={{padding: 20}}>
            <Grid className={props.classes.root} container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <TextInput type='text' name='contactId' label='Name'/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextInput type='text' name='role' label='Description'/>
                </Grid>
            </Grid>
        </div>

    )
}

export default withStyles(styles)(MemberEditor)
