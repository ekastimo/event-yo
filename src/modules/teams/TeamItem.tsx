import * as React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {ITeam} from "./types";
import XListItem from "../../widgets/lists/XListItem";

interface IProps {
    data: ITeam,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

const TeamItem = (props: IProps) => {
    const {data} = props
    const {name,description} = data
    return (
        <XListItem {...props}
        >
            <Avatar alt={name} src={''}/>
            <ListItemText
                primary={name}
                secondary={description}
            />
        </XListItem>
    );
}

export default TeamItem;
