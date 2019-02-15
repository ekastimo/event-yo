import * as React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {ITeamMember} from "../types";
import XListItem from "../../../widgets/lists/XListItem";

interface IProps {
    data: ITeamMember,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

const MemberItem = (props: IProps) => {
    const {data} = props
    const {contactName, contactAvatar, status, role} = data
    return (
        <XListItem {...props}
        >
            <Avatar alt={contactName} src={contactAvatar}/>
            <ListItemText
                primary={contactName}
                secondary={`${role}, ${status}`}
            />
        </XListItem>
    );
}

export default MemberItem;
