import * as React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import {IContact} from "./types";
import {renderName} from "./config";
import XListItem from "../../widgets/lists/XListItem";
import Typography from "@material-ui/core/Typography";
import {isNullOrEmpty, parseAvatar} from "../../utils/TK";


interface IProps {
    data: IContact,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

const ContactItem = (props: IProps) => {
    const {data} = props
    const {firstName, lastName, avatar} = data.person
    const {person, emails: [email], phones: [phone]} = data
    return (
        <XListItem
            {...props}
            editOnClick
        >
            {
                isNullOrEmpty(avatar) ?
                    <Avatar alt={lastName}>{parseAvatar(`${firstName} ${lastName}`)}</Avatar> :
                    <Avatar alt={firstName} src={avatar}/>
            }
            <ListItemText
                disableTypography
                primary={
                    <Typography variant="body2" component='span'>
                        {renderName(person)}
                    </Typography>
                }
                secondary={<div>
                    <Typography variant="caption" inline>
                        <EmailIcon fontSize="inherit"/>&nbsp;{email.address}
                    </Typography><br/>
                    <Typography variant="caption" inline>
                        <PhoneIcon fontSize="inherit"/>&nbsp;{phone.number}
                    </Typography>
                </div>}
            />
        </XListItem>
    );
}

export default ContactItem;
