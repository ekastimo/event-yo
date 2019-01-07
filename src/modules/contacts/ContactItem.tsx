import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import MoreMenu from "../../widgets/MoreMenu";
import {IContact} from "./types";
import {renderName} from "./config";

const options = [
    'View',
    'Edit',
    'Delete'
];

interface IProps {
    data: IContact,
    onView: (data: any) => any
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

class ContactItem extends React.Component<IProps> {

    public render() {
        const {data, onView} = this.props
        const {firstName, avatar} = data.person
        const {person, emails: [email], phones: [phone]} = data
        const handleView = () => onView({...data})
        return (
            <ListItem dense button onClick={handleView}>
                <Avatar alt={firstName} src={avatar}/>
                <ListItemText
                    primary={renderName(person)}
                    secondary={`${email.address}, ${phone.number}`}
                />
                <ListItemSecondaryAction>
                    <MoreMenu options={options} onItemSelected={this.onItemSelected}/>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    private onItemSelected = (item: any) => {
        const {data, onView, onEdit, onDelete} = this.props
        console.log("Item selected", item)
        switch (item) {
            case 'View':
                onView(data)
                break;
            case 'Edit':
                onEdit(data)
                break;
            case 'Delete':
                onDelete(data)
                break;
        }
    }
}


export default ContactItem;
