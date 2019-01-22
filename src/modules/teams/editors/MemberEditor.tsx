import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';
import {remoteRoutes} from "../../../data/constants";
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";
import {toOptions} from "../../../utils/TK";
import {teamMemberCategory} from "../config";
import SelectInput from "../../../widgets/inputs/SelectInput";

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
                    <XRemoteSelect
                        name='contactId' label='Members'
                        remote={remoteRoutes.contactSearch}
                        parser={(it: any) => ({label: it.fullName, value: it.id})}
                        isMulti={true}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SelectInput name='role' label='Type' options={toOptions(teamMemberCategory)}/>
                </Grid>
            </Grid>
        </div>

    )
}

export default withStyles(styles)(MemberEditor)
