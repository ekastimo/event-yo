import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import {toOptions} from "../../../utils/TK";
import {teamMemberCategory, teamMemberStatus} from "../config";
import SelectInput from "../../../widgets/inputs/SelectInput";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

interface IProps extends WithStyles<typeof styles> {
}

const EditMember = (props: IProps) => {
    return (
        <div style={{padding: 12}}>
            <Grid className={props.classes.root} container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <SelectInput name='role' label='Type' options={toOptions(teamMemberCategory)}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SelectInput name='status' label='Status' options={toOptions(teamMemberStatus)}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(EditMember)
