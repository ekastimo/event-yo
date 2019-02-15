import * as React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {IContact} from "./types";
import {renderName} from "./config";
import XListItem from "../../widgets/lists/XListItem";


interface IProps {
    data: IContact,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

const ContactItem = (props: IProps) => {
    const {data} = props
    const {firstName, avatar} = data.person
    const {person, emails: [email], phones: [phone]} = data
    return (
        <XListItem {...props}
        >
            <Avatar alt={firstName} src={avatar}/>
            <ListItemText
                primary={renderName(person)}
                secondary={`${email.address}, ${phone.number}`}
            />
        </XListItem>
    );
}

export default ContactItem;
