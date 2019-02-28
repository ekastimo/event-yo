import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {remoteRoutes} from "../../../data/constants";
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";
import {ICellGroupMember} from "../types";
import {IOption} from "../../../data/types";

interface IProps  {
    members: ICellGroupMember[]
}

const AddMember = (props: IProps) => {
    const {members} = props
    const ids = members.map(it => it.contactId)
    const filter = (it: IOption) => ids.indexOf(it.value)=== -1
    const parser = (it: any) => ({label: it.fullName, value: it.id})
    return (
        <div style={{padding: 12}}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <XRemoteSelect
                        name='contactIds' label='Members'
                        remote={remoteRoutes.contactSearch}
                        parser={parser}
                        filter={filter}
                        isMulti={true}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default AddMember
