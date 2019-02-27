import * as React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {ILocation} from "./types";
import XListItem from "../../widgets/lists/XListItem";

interface IProps {
    data: ILocation,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

const LocationItem = (props: IProps) => {
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

export default LocationItem;
