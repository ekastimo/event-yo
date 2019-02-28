import * as React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {ILocation} from "./types";
import XListItem from "../../widgets/lists/XListItem";
import {parseAvatar} from "../../utils/TK";

interface IProps {
    data: ILocation,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

const LocationItem = (props: IProps) => {
    const {data} = props
    const {name, details} = data
    return (
        <XListItem {...props}
        >
            <Avatar alt={name}>{parseAvatar(name)}</Avatar>
            <ListItemText
                primary={name}
                secondary={details}
            />
        </XListItem>
    );
}

export default LocationItem;
