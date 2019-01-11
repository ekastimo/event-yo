import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import MoreMenu from "../../../widgets/MoreMenu";
import {ITeamMember} from "../types";

const options = [
    'View',
    'Edit',
    'Delete'
];

interface IProps {
    data: ITeamMember,
    onView: (data: any) => any
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

class MemberItem extends React.Component<IProps> {

    public render() {
        const {data, onView} = this.props
        const {contactName, contactAvatar, status, role} = data
        const handleView = () => onView({...data})
        return (
            <ListItem dense button onClick={handleView}>
                <Avatar alt={contactName} src={contactAvatar}/>
                <ListItemText
                    primary={contactName}
                    secondary={`${role}, ${status}`}
                />
                <ListItemSecondaryAction>
                    <MoreMenu options={options} onItemSelected={this.onItemSelected}/>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    private onItemSelected = (item: any) => {
        const {data, onView, onEdit, onDelete} = this.props
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


export default MemberItem;
